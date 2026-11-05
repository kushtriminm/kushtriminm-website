"use client";

import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useLang } from "@/components/LanguageProvider";

const INSTAGRAM_URL = "https://www.instagram.com/kushtriminm";
// Leave "" to hide a button.
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558633936209";
const TIKTOK_URL = "https://www.tiktok.com/@kushtriminm";

// All the words here, in both languages. Change them here.
const labels = {
  sq: { eyebrow: "Na ndiq", text: "Oferta të reja dhe udhëtimet e radhës." },
  en: { eyebrow: "Follow us", text: "New offers and upcoming trips." },
};

const round =
  "flex h-12 w-12 items-center justify-center rounded-full text-white transition hover:scale-105";

export default function FollowInstagram() {
  const { lang } = useLang();
  const t = labels[lang];

  return (
    <section className="bg-black px-5 py-8 sm:py-10">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 rounded-2xl border border-white/10 bg-neutral-900/60 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase text-red-500">{t.eyebrow}</p>
          <p className="mt-1 break-words text-xl font-extrabold uppercase tracking-wide text-white">
            @kushtriminm
          </p>
          <p className="mt-1 text-balance text-sm text-gray-400">{t.text}</p>
        </div>

        <div className="flex shrink-0 gap-3">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className={`${round} bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)]`}
          >
            <FaInstagram size={20} />
          </a>
          {FACEBOOK_URL && (
            <a
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className={`${round} bg-[#1877F2]`}
            >
              <FaFacebookF size={18} />
            </a>
          )}
          {TIKTOK_URL && (
            <a
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className={`${round} border border-white/25 bg-black`}
            >
              <FaTiktok size={18} />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}