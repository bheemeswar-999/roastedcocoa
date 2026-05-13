import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products';
import { getStoredProducts } from '../utils/productStorage';
import { addProductReview, getProductReviews } from '../utils/reviewStorage';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

function Products() {
  const [products, setProducts] = useState([]);
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
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-12 max-w-3xl space-y-4">
            <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Our range</p>
            <h1 className="text-4xl font-semibold text-espresso md:text-5xl">Handcrafted chocolates & gift hampers</h1>
            <p className="text-base leading-8 text-espresso/75">
              Explore our premium chocolate collection with luxury packaging, custom name pieces, and festival-ready hampers.
            </p>
          </div>
          {products.length ? (
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} onReviewClick={handleReviewClick} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-espresso/10 bg-white p-12 text-center text-espresso/75 shadow-premium">
              <p className="text-xl font-semibold">No products available yet.</p>
              <p className="mt-3 text-sm">Add items from the admin panel and they will appear here automatically.</p>
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
    </main>
  );
}

export default Products;
