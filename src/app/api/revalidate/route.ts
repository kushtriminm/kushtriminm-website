import { revalidatePath, revalidateTag } from "next/cache";
import { LIVE_TAG } from "@/lib/live";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/lib/live-types";

// Called by the agent panel after saving, so the public pages show the change at once
// (otherwise they update by themselves within a minute).
// Only a logged-in admin may call it: the login token is checked with Supabase.
export async function POST(request: Request) {
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token || !SUPABASE_URL || !SUPABASE_ANON_KEY) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const headers = { apikey: SUPABASE_ANON_KEY, Authorization: `Bearer ${token}` };

  const userRes = await fetch(`${SUPABASE_URL}/auth/v1/user`, { headers, cache: "no-store" });
  if (!userRes.ok) return Response.json({ ok: false }, { status: 401 });
  const user = (await userRes.json()) as { id?: string };
  if (!user.id) return Response.json({ ok: false }, { status: 401 });

  // The admins table only shows a row to its own admin, so a row back means "is admin".
  const adminRes = await fetch(
    `${SUPABASE_URL}/rest/v1/site_admins?select=user_id&user_id=eq.${encodeURIComponent(user.id)}`,
    { headers, cache: "no-store" }
  );
  const rows = adminRes.ok ? ((await adminRes.json()) as unknown[]) : [];
  if (rows.length === 0) return Response.json({ ok: false }, { status: 403 });

  revalidateTag(LIVE_TAG, "max");
  revalidatePath("/", "layout");
  return Response.json({ ok: true });
}
