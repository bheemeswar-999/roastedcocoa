import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGift, FaLeaf, FaHeart, FaStar } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';
import { getStoredProducts } from '../utils/productStorage';
import ChatBot from '../components/ChatBot';
import { addProductReview, getProductReviews } from '../utils/reviewStorage';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    rating: 5,
    comment: '',
  });
  const [productReviews, setProductReviews] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const storedProducts = getStoredProducts();

      if (!isSupabaseConfigured) {
        setProducts(storedProducts.length > 0 ? storedProducts : productsData);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('id', { ascending: false });

        if (error) {
          throw error;
        }

        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          return;
        }
      } catch (error) {
        console.error('Failed to load products from Supabase:', error);
        setError('Unable to load products from Supabase. Showing local cached products if available.');
      }

      setProducts(storedProducts.length > 0 ? storedProducts : productsData);
    };

    loadProducts();
  }, []);

  const handleReviewClick = (productId) => {
    setSelectedProductId(productId);
    setProductReviews(getProductReviews(productId));
    setReviewForm({ name: '', rating: 5, comment: '' });
  };

  const handleReviewChange = (e) => {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: name === 'rating' ? Number(value) : value,
    }));
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name || !reviewForm.comment) {
      alert('Please enter your name and comment.');
      return;
    }

    addProductReview(selectedProductId, {
      name: reviewForm.name,
      rating: reviewForm.rating,
      comment: reviewForm.comment,
    });

    setProductReviews(getProductReviews(selectedProductId));
    setReviewForm({ name: '', rating: 5, comment: '' });
    alert('Review submitted successfully!');
  };

  const closeReviewModal = () => {
    setSelectedProductId(null);
    setReviewForm({ name: '', rating: 5, comment: '' });
  };

  const selectedProduct = products.find((p) => p.id === selectedProductId);

  return (
    <main className="pt-28">
      <section className="relative overflow-hidden rounded-b-[4rem] bg-hero-pattern bg-cover bg-center py-28 text-cream shadow-premium">
        <div className="absolute inset-0 bg-espresso/40"></div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-10 px-4 md:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex rounded-full border border-cream/60 bg-cream/10 px-4 py-2 text-sm uppercase tracking-[0.35em] text-cream/90"
            >
              Luxury Handmade Chocolates
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-4xl font-semibold leading-tight tracking-tight md:text-5xl lg:text-6xl"
            >
              Handmade Chocolates Crafted with Love
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-xl text-base leading-7 text-cream/90 md:text-lg"
            >
              Indulge in freshly handcrafted chocolates, rich flavors, and elegant gift hampers made to celebrate special moments.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center rounded-full bg-gold px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-espresso shadow-xl shadow-gold/20 transition hover:bg-[#c6943f]"
              >
                Order Now
              </Link>
              <a
                href="https://wa.me/919963781985?text=Hi%2C%20I%20want%20to%20order%20handmade%20chocolates"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-cream px-8 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-cream transition hover:bg-cream/15"
              >
                Order on WhatsApp
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="relative mx-auto max-w-xl rounded-[2.5rem] border border-cream/40 bg-cream/10 p-6 shadow-2xl shadow-espresso/20 lg:mx-0 lg:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-[2rem] bg-white/10 p-5 backdrop-blur-sm">
                <p className="uppercase tracking-[0.3em] text-sm text-cream/85">Signature flavor</p>
                <h3 className="mt-4 text-xl font-semibold text-cream">Rich Dark Chocolate</h3>
                <p className="mt-3 text-sm leading-6 text-cream/80">
                  Smooth, premium cacao with an elegant finish and delicate handcrafted styling.
                </p>
              </div>
              <div className="rounded-[2rem] bg-white/10 p-5 backdrop-blur-sm">
                <p className="uppercase tracking-[0.3em] text-sm text-cream/85">Gift hamper</p>
                <h3 className="mt-4 text-xl font-semibold text-cream">Festive Box</h3>
                <p className="mt-3 text-sm leading-6 text-cream/80">
                  Beautifully wrapped boxes for birthdays, anniversaries, and festival moments.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl py-20 md:px-6">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          {error && (
            <div className="rounded-[2rem] border border-red-200 bg-red-50 p-6 text-sm text-red-700 shadow-premium">
              {error}
            </div>
          )}
          <div className="space-y-6">
            <span className="inline-flex rounded-full bg-gold/10 px-4 py-2 text-xs uppercase tracking-[0.35em] text-cocoa">
              Premium collection
            </span>
            <h2 className="text-3xl font-semibold tracking-tight text-espresso md:text-4xl">
              Treat every occasion with handcrafted decadence.
            </h2>
            <p className="max-w-2xl text-base leading-8 text-espresso/75">
              Discover a curated selection of artisan chocolates, custom name pieces and gift hampers made with love and the finest ingredients.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[2rem] border border-espresso/10 bg-cream p-6 shadow-premium">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-espresso/5 text-2xl text-gold">
                <FaLeaf />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-espresso">Fresh ingredients</h3>
              <p className="mt-2 text-sm leading-6 text-espresso/70">
                Every batch is prepared with fresh cocoa and premium fillings for a memorable taste.
              </p>
            </div>
            <div className="rounded-[2rem] border border-espresso/10 bg-cream p-6 shadow-premium">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-espresso/5 text-2xl text-gold">
                <FaHeart />
              </div>
              <h3 className="mt-4 text-xl font-semibold text-espresso">Handmade with love</h3>
              <p className="mt-2 text-sm leading-6 text-espresso/70">
                Each chocolate is carefully created by hand for a luxurious and heartfelt gift.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-espresso/5 py-20">
        <div className="mx-auto max-w-7xl space-y-10 px-4 md:px-6">
          <div className="space-y-3 text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Best sellers</p>
            <h2 className="text-3xl font-semibold text-espresso md:text-4xl">A glimpse of our chocolate collection</h2>
          </div>
          {products.length ? (
            <>
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {products.slice(0, 3).map((product) => (
                  <ProductCard key={product.id} product={product} onReviewClick={handleReviewClick} />
                ))}
              </div>

              <div className="mt-10 text-center">
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center rounded-full bg-espresso px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-cream transition hover:bg-espresso/95"
                >
                  View all products
                </Link>
              </div>

              <div className="mt-16 rounded-[2rem] border border-espresso/10 bg-white p-10 shadow-premium">
                <div className="mb-8 text-center">
                  <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Customer reviews</p>
                  <h3 className="text-3xl font-semibold text-espresso">Anyone can leave a review</h3>
                  <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-espresso/75">
                    Share your experience with our handcrafted chocolates and gift hampers. Your feedback helps us create even more memorable treats.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-4 md:flex-row md:justify-center">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center rounded-full bg-espresso px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-cream transition hover:bg-espresso/95"
                  >
                    Leave a review
                  </Link>
                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center rounded-full border border-espresso/10 bg-white px-8 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-espresso transition hover:bg-espresso/5"
                  >
                    Browse products
                  </Link>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-[2rem] border border-espresso/10 bg-white p-10 text-center text-espresso/75 shadow-premium">
              <p className="text-xl font-semibold">No featured products yet.</p>
              <p className="mt-3 text-sm">Add products in the admin panel to show them here.</p>
            </div>
          )}
        </div>
      </section>

      {selectedProductId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-espresso/50 px-4">
          <div className="max-h-96 w-full max-w-2xl overflow-y-auto rounded-[2.5rem] bg-white p-8 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-espresso">{selectedProduct?.name}</h2>
              <button
                onClick={closeReviewModal}
                className="text-2xl font-bold text-espresso/60 hover:text-espresso"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 max-h-48 space-y-4 overflow-y-auto rounded-[1.75rem] bg-cream p-4">
              {productReviews.length > 0 ? (
                productReviews.map((review) => (
                  <div key={review.id} className="border-b border-espresso/10 pb-4 last:border-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-espresso">{review.name}</h3>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                          <FaStar
                            key={index}
                            className={`h-3 w-3 ${index < review.rating ? 'text-gold' : 'text-gold/30'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-espresso/75">{review.comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-espresso/70">No reviews yet. Be the first to review!</p>
              )}
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-semibold text-espresso">Your name</label>
                <input
                  type="text"
                  name="name"
                  value={reviewForm.name}
                  onChange={handleReviewChange}
                  className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-espresso">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm((prev) => ({ ...prev, rating: star }))}
                      className="text-2xl transition"
                    >
                      <FaStar
                        className={star <= reviewForm.rating ? 'text-gold' : 'text-gold/30'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-espresso">Your review</label>
                <textarea
                  name="comment"
                  value={reviewForm.comment}
                  onChange={handleReviewChange}
                  rows="3"
                  className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center rounded-full bg-espresso px-6 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-cream transition hover:bg-espresso/95"
              >
                Submit review
              </button>
            </form>
          </div>
        </div>
      )}
      {/* Customer-facing chat widget */}
      <div className="fixed right-6 bottom-6 z-50">
        <ChatBot products={products} />
      </div>
    </main>
  );
}

export default Home;
