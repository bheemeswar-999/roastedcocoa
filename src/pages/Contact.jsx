import { FaWhatsapp, FaInstagram, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

function Contact() {
  return (
    <main className="pt-28">
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Get in touch</p>
              <h1 className="text-4xl font-semibold text-espresso md:text-5xl">Reach out for personalized chocolate orders and luxury gifting.</h1>
              <p className="text-base leading-8 text-espresso/75">
                Send a message, place your order directly on WhatsApp, or explore our premium chocolate hampers for every celebration.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <a
                  href="https://wa.me/919963781985"
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[2rem] bg-white p-6 text-espresso shadow-premium transition hover:-translate-y-1 hover:bg-gold/10"
                >
                  <FaWhatsapp className="text-2xl text-green-500" />
                  <p className="mt-4 text-sm font-semibold">WhatsApp</p>
                  <p className="mt-2 text-sm text-espresso/70">Message us to place your order</p>
                </a>
                <a
                  href="https://www.instagram.com/roastedcocoa?igsh=MXNxbzZpYXZwYjB1MQ=="
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[2rem] bg-white p-6 text-espresso shadow-premium transition hover:-translate-y-1 hover:bg-gold/10"
                >
                  <FaInstagram className="text-2xl text-pink-500" />
                  <p className="mt-4 text-sm font-semibold">Instagram</p>
                  <p className="mt-2 text-sm text-espresso/70">@roastedcocoa</p>
                </a>
              </div>
            </div>

            <div className="space-y-8 rounded-[2.5rem] bg-espresso/5 p-8 shadow-xl">
              <form className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-espresso">Name</label>
                  <input className="w-full rounded-3xl border border-espresso/10 bg-white/90 px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20" placeholder="Your name" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-espresso">Email</label>
                  <input className="w-full rounded-3xl border border-espresso/10 bg-white/90 px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20" placeholder="Your email (optional)" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-espresso">Message</label>
                  <textarea rows="5" className="w-full rounded-3xl border border-espresso/10 bg-white/90 px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20" placeholder="Tell us about your order" />
                </div>
                <button type="submit" className="inline-flex w-full items-center justify-center rounded-full bg-gold px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-espresso shadow-xl transition hover:bg-[#c6943f]">
                  Send message
                </button>
              </form>

              <div className="rounded-[2rem] border border-espresso/10 bg-white p-6 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gold/10 text-gold">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Our location</p>
                    <p className="mt-2 text-sm text-espresso/80">Deliveries across your city with fresh daily batches.</p>
                  </div>
                </div>
                <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-espresso/10 bg-espresso/5 text-center text-sm text-espresso/70">
                  <iframe
                    title="Location map"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.902565282049!2d90.39945241499312!3d23.744794384589934!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8f317e9a9f9%3A0x7b1430c6ba8f7e19!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin"
                    className="h-56 w-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Contact;
