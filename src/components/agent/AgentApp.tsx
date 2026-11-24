"use client";

import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { BedDouble, LogOut, Megaphone } from "lucide-react";
import { getSupabase } from "@/lib/supabase-browser";
import HotelsPanel, { type AgentHotel } from "./HotelsPanel";
import OffersPanel from "./OffersPanel";
import { btnRed, card, field, label } from "./ui";

// The private agent panel. It covers the whole screen (no website menu or buttons),
// and only an account listed in the site_admins table can save anything.
export default function AgentApp({ hotels }: { hotels: AgentHotel[] }) {
  const sb = getSupabase();
  const [session, setSession] = useState<Session | null>(null);
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [tab, setTab] = useState<"offers" | "hotels">("offers");

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });
    const { data } = sb.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, [sb]);

  // Logged in, but is this account allowed to edit the website?
  useEffect(() => {
    if (!sb || !session) return;
    let alive = true;
    sb.from("site_admins")
      .select("user_id")
      .eq("user_id", session.user.id)
      .then(({ data }) => {
        if (alive) setIsAdmin(!!data && data.length > 0);
      });
    return () => {
      alive = false;
    };
  }, [sb, session]);

  let body;
  if (!sb) {
    body = (
      <Notice title="Not connected">
        The website has no Supabase keys yet (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY).
      </Notice>
    );
  } else if (checking) {
    body = <p className="text-center text-gray-400">Loading…</p>;
  } else if (!session) {
    body = <Login />;
  } else if (!isAdmin) {
    body = (
      <Notice title="No access">
        This account is not an admin. Add it to the site_admins table in Supabase.
        <button type="button" className={`${btnRed} mt-5`} onClick={() => sb.auth.signOut()}>
          Sign out
        </button>
      </Notice>
    );
  } else {
    body = (
      <>
        <div className="mb-6 flex gap-2 rounded-full border border-white/10 bg-neutral-900 p-1">
          {(
            [
              ["offers", "Offers", Megaphone],
              ["hotels", "Hotels", BedDouble],
            ] as const
          ).map(([id, name, Icon]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              aria-pressed={tab === id}
              className={`flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-full text-sm font-bold transition ${
                tab === id ? "bg-red-600 text-white" : "text-gray-300 hover:text-white"
              }`}
            >
              <Icon size={17} aria-hidden="true" /> {name}
            </button>
          ))}
        </div>
        {tab === "offers" ? <OffersPanel sb={sb} /> : <HotelsPanel sb={sb} hotels={hotels} />}
      </>
    );
  }

  return (
    <div className="fixed inset-0 z-[1000] overflow-y-auto bg-black text-white">
      <header className="sticky top-0 z-10 border-b border-white/10 bg-black/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em]">
            Kushtrimi <span className="text-red-500">Agent</span>
          </p>
          {session && sb && (
            <button
              type="button"
              onClick={() => sb.auth.signOut()}
              className="flex min-h-[40px] items-center gap-2 rounded-full px-3 text-sm text-gray-300 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut size={16} /> Sign out
            </button>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 pb-24 pt-6">{body}</main>
    </div>
  );
}

function Notice({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className={`${card} mx-auto max-w-md text-center`}>
      <h1 className="text-xl font-extrabold uppercase">{title}</h1>
      <div className="mt-3 text-sm text-gray-400">{children}</div>
    </div>
  );
}

function Login() {
  const sb = getSupabase()!;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <form
      className={`${card} mx-auto mt-10 max-w-sm space-y-4`}
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        setError("");
        const { error } = await sb.auth.signInWithPassword({ email: email.trim(), password });
        if (error) setError("Wrong e-mail or password.");
        setBusy(false);
      }}
    >
      <h1 className="text-center text-xl font-extrabold uppercase tracking-wide">Agent login</h1>
      <div>
        <label className={label} htmlFor="lg-email">E-mail</label>
        <input id="lg-email" type="email" autoComplete="username" required className={field} value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label className={label} htmlFor="lg-pass">Password</label>
        <input id="lg-pass" type="password" autoComplete="current-password" required className={field} value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <button type="submit" className={`${btnRed} w-full`} disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
