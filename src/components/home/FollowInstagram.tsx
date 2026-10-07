import { FaFacebookF, FaInstagram } from "react-icons/fa";

const INSTAGRAM_URL = "https://www.instagram.com/kushtriminm";
// Leave "" to hide the Facebook button.
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61558633936209";

export default function FollowInstagram() {
  return (
    <section className="bg-black px-5 py-14 sm:py-20">
      <div className="relative mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/10 bg-neutral-900/60 px-6 py-10 text-center sm:px-10">
        <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 rounded-full bg-red-600/15 blur-3xl" />

        <div className="relative">
          <p className="text-sm font-bold uppercase text-red-500">Na ndiq</p>
          <h2 className="mt-2 text-2xl font-extrabold uppercase tracking-wide text-white sm:text-4xl">
            @kushtriminm
          </h2>
          <p className="mt-3 text-sm text-gray-400">
            Oferta të reja dhe udhëtimet e radhës.
          </p>

          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] px-8 py-3 font-bold text-white transition hover:scale-105 hover:brightness-110 sm:w-auto"
            >
              <FaInstagram size={18} />
              Instagram
            </a>

            {FACEBOOK_URL && (
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1877F2] px-8 py-3 font-bold text-white transition hover:scale-105 hover:bg-[#166fe0] sm:w-auto"
              >
                <FaFacebookF size={16} />
                Facebook
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}