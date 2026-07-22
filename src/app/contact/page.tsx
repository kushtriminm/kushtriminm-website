import Link from "next/link";
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-10">
  <Link
    href="/"
    className="inline-flex items-center rounded-full border border-neutral-700 px-6 py-3 text-white transition hover:border-red-500 hover:text-red-500"
  >
    ← Back to Home
  </Link>
</div>

        <h1 className="text-center text-6xl font-bold text-white">
          Contact Us
        </h1>

        <div className="mt-16 space-y-8 rounded-3xl bg-neutral-900 p-10">

          <div>
            <h2 className="text-xl font-bold text-white">
              Phone
            </h2>

            <p className="mt-2 text-gray-400">
              +383 49 833 888
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Email
            </h2>

            <p className="mt-2 text-gray-400">
              info@kushtriminm.com
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">
              Address
            </h2>

            <p className="mt-2 text-gray-400">
              Gjakovë, Kosovo
            </p>
          </div>

          <a
            href="https://wa.me/38349833888"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
          >
            Contact on WhatsApp
          </a>

        </div>

      </div>
    </main>
  );
}