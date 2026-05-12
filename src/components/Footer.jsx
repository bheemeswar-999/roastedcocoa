import { FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="border-t border-espresso/10 bg-cream/90 py-12">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight text-espresso">Roasted Cocoa</h2>
          <p className="max-w-md text-sm text-espresso/75">
            Premium handmade chocolates, luxurious gift hampers, and heartfelt gifting for every celebration.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <a
            href="https://www.instagram.com/roastedcocoa?igsh=MXNxbzZpYXZwYjB1MQ=="
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-3xl bg-espresso/95 px-5 py-4 text-sm font-semibold text-cream transition hover:bg-espresso"
          >
            <FaInstagram /> Instagram
          </a>
          <a
            href="https://wa.me/919963781985"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-3xl border border-espresso/10 bg-white px-5 py-4 text-sm font-semibold text-espresso transition hover:border-gold"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
        <div className="mt-6 text-center text-sm text-espresso/60">
          <a href="/admin" className="hover:text-espresso">Admin panel</a>
        </div>
      </div>
      <div className="mt-10 border-t border-espresso/10 pt-6 text-center text-sm text-espresso/70">
        © {new Date().getFullYear()} Roasted Cocoa. Crafted with love for premium chocolate experiences.
      </div>
    </footer>
  );
}

export default Footer;
