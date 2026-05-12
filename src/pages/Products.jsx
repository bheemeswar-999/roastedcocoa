import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { getStoredProducts } from '../utils/productStorage';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      if (!isSupabaseConfigured) {
        setProducts(getStoredProducts());
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

      setProducts(getStoredProducts());
    };

    loadProducts();
  }, []);

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
                <ProductCard key={product.id} product={product} />
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
    </main>
  );
}

export default Products;
