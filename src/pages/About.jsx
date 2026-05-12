import { motion } from 'framer-motion';
import { FaSeedling, FaLeaf, FaGift } from 'react-icons/fa';

function About() {
  return (
    <main className="pt-28">
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">About us</p>
            <h1 className="text-4xl font-semibold text-espresso md:text-5xl">Premium homemade chocolates made for memorable gifting.</h1>
            <p className="text-base leading-8 text-espresso/75">
              At Roasted Cocoa, we bring together premium ingredients, handcrafted care, and elegant presentation to create chocolates that feel special.
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="rounded-[2rem] border border-espresso/10 bg-white p-8 shadow-premium"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-espresso/5 text-2xl text-gold">
                <FaSeedling />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-espresso">Fresh ingredients</h2>
              <p className="mt-4 text-sm leading-7 text-espresso/75">
                We source premium cocoa, nuts, and spices so every chocolate bite feels fresh and indulgent.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6 }}
              className="rounded-[2rem] border border-espresso/10 bg-white p-8 shadow-premium"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-espresso/5 text-2xl text-gold">
                <FaLeaf />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-espresso">Handmade with love</h2>
              <p className="mt-4 text-sm leading-7 text-espresso/75">
                Every piece is shaped, filled, and finished by hand to preserve quality and delight each customer.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="rounded-[2rem] border border-espresso/10 bg-white p-8 shadow-premium"
            >
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-espresso/5 text-2xl text-gold">
                <FaGift />
              </div>
              <h2 className="mt-6 text-2xl font-semibold text-espresso">Custom gift hampers</h2>
              <p className="mt-4 text-sm leading-7 text-espresso/75">
                Celebrate birthdays, festivals, and celebrations with unique hampers designed for your loved ones.
              </p>
            </motion.div>
          </div>

          <div className="mt-16 rounded-[2.5rem] border border-espresso/10 bg-espresso/5 p-10 shadow-xl">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div className="space-y-4">
                <span className="inline-flex rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cocoa">
                  Our promise
                </span>
                <h2 className="text-3xl font-semibold text-espresso">Crafted for moments that deserve a luxury touch.</h2>
                <p className="text-base leading-8 text-espresso/75">
                  With each order, we blend thoughtful packaging, decadent flavors, and a premium experience to make gifting feel unforgettable.
                </p>
              </div>
              <div className="rounded-[2rem] bg-cream/90 p-8 shadow-lg">
                <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Quality experience</p>
                <ul className="mt-6 space-y-4 text-sm leading-7 text-espresso/75">
                  <li>• Handmade batches with small-batch attention</li>
                  <li>• Tailored hampers and seasonal specials</li>
                  <li>• Fresh textures and luxury presentation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
