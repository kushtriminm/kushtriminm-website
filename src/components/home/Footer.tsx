export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black py-12 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row">

        <div>
          <h2 className="text-2xl font-bold">
            Kushtrimi <span>NM</span> Worldwide
          </h2>

          <p className="mt-2 text-gray-400">
            Luxury travel experiences around the world.
          </p>
        </div>

        <div className="text-right">
          <p>📞 +383 49 833 888</p>
          <p>✉ info@kushtriminm.com</p>
          <p>📍 Gjakovë, Rr. Xheladin Hana</p>
        </div>

      </div>
    </footer>
  );
}