import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaLock } from 'react-icons/fa';
import productsData from '../data/products';

const ADMIN_EMAIL = 'kcommando89@gmail.com';
const ADMIN_PASSWORD = 'kc@986kc';

const initialProductState = {
  name: '',
  price: '',
  description: '',
  image: '',
};

const initialOrderState = {
  customerName: '',
  email: '',
  phone: '',
  product: '',
  message: '',
  delivered: false,
};

const initialLoginState = {
  email: '',
  password: '',
};

function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginState);
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [previewImage, setPreviewImage] = useState('');
  const [editingProductId, setEditingProductId] = useState(null);
  const [newOrder, setNewOrder] = useState(initialOrderState);

  useEffect(() => {
    const storedProducts = localStorage.getItem('roastedCocoaProducts');
    const storedOrders = localStorage.getItem('roastedCocoaOrders');
    const storedAuth = localStorage.getItem('roastedCocoaAdminAuth');

    setProducts(storedProducts ? JSON.parse(storedProducts) : productsData);
    setOrders(storedOrders ? JSON.parse(storedOrders) : []);
    setIsLoggedIn(storedAuth === 'true');
  }, []);

  useEffect(() => {
    localStorage.setItem('roastedCocoaProducts', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('roastedCocoaOrders', JSON.stringify(orders));
  }, [orders]);

  const handleLoginChange = (field, value) => {
    setLoginForm((prev) => ({ ...prev, [field]: value }));
    setLoginError('');
  };

  const handleLogin = () => {
    if (loginForm.email === ADMIN_EMAIL && loginForm.password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError('');
      localStorage.setItem('roastedCocoaAdminAuth', 'true');
      setLoginForm(initialLoginState);
      return;
    }

    setLoginError('Invalid email or password.');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('roastedCocoaAdminAuth');
  };

  const handleProductChange = (field, value) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      setPreviewImage(result);
      setNewProduct((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const resetProductForm = () => {
    setNewProduct(initialProductState);
    setPreviewImage('');
    setEditingProductId(null);
  };

  const saveProduct = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.description || !newProduct.image) {
      return;
    }

    if (editingProductId) {
      setProducts((prev) =>
        prev.map((item) =>
          item.id === editingProductId ? { ...item, ...newProduct, id: editingProductId } : item,
        ),
      );
      resetProductForm();
      return;
    }

    const productToAdd = {
      id: Date.now(),
      ...newProduct,
    };

    setProducts((prev) => [productToAdd, ...prev]);
    resetProductForm();
  };

  const startEditProduct = (product) => {
    setEditingProductId(product.id);
    setNewProduct({
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
    setPreviewImage(product.image);
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  const handleOrderChange = (field, value) => {
    setNewOrder((prev) => ({ ...prev, [field]: value }));
  };

  const submitOrder = () => {
    if (!newOrder.customerName || (!newOrder.email && !newOrder.phone) || !newOrder.product) {
      return;
    }

    setOrders((prev) => [
      {
        id: Date.now(),
        submittedAt: new Date().toISOString(),
        delivered: false,
        ...newOrder,
      },
      ...prev,
    ]);
    setNewOrder(initialOrderState);
  };

  const toggleOrderDelivered = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, delivered: !order.delivered } : order,
      ),
    );
  };

  const clearOrders = () => {
    setOrders([]);
  };

  if (!isLoggedIn) {
    return (
      <main className="pt-28">
        <section className="bg-cream py-20">
          <div className="mx-auto max-w-md rounded-[2.5rem] border border-espresso/10 bg-white p-10 shadow-premium">
            <div className="mb-8 flex items-center gap-4">
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-espresso/5 text-2xl text-gold">
                <FaLock />
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Admin login</p>
                <h1 className="mt-2 text-3xl font-semibold text-espresso">Secure access to the admin dashboard</h1>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-semibold text-espresso">Email</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => handleLoginChange('email', e.target.value)}
                  className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                  placeholder="kcommando89@gmail.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-espresso">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => handleLoginChange('password', e.target.value)}
                  className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                  placeholder="********"
                />
              </div>
              {loginError && <p className="text-sm text-red-600">{loginError}</p>}
              <button
                type="button"
                onClick={handleLogin}
                className="inline-flex w-full items-center justify-center rounded-full bg-espresso px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-cream shadow-xl transition hover:bg-espresso/90"
              >
                Sign in
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-28">
      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <div className="mb-10 flex flex-col gap-6 rounded-[2.5rem] bg-espresso/5 p-8 shadow-premium md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cocoa/70">Admin panel</p>
              <h1 className="mt-3 text-4xl font-semibold text-espresso md:text-5xl">Manage products and customer orders</h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('products')}
                className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition ${
                  activeTab === 'products' ? 'bg-gold text-espresso' : 'bg-white text-espresso/80 shadow-sm'
                }`}
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('orders')}
                className={`rounded-full px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] transition ${
                  activeTab === 'orders' ? 'bg-gold text-espresso' : 'bg-white text-espresso/80 shadow-sm'
                }`}
              >
                Orders
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-espresso/10 px-5 py-3 text-sm font-semibold uppercase tracking-[0.24em] text-espresso transition hover:bg-espresso/20"
              >
                Logout
              </button>
            </div>
          </div>

          {activeTab === 'products' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="rounded-[2.5rem] border border-espresso/10 bg-white p-8 shadow-premium">
                <h2 className="text-2xl font-semibold text-espresso">Add new product</h2>
                <p className="mt-3 text-sm leading-7 text-espresso/75">
                  Upload a new product card with an image and details. Product data is stored locally in your browser.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">Product name</label>
                    <input
                      value={newProduct.name}
                      onChange={(e) => handleProductChange('name', e.target.value)}
                      className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                      placeholder="Almond Chocolate"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">Price</label>
                    <input
                      value={newProduct.price}
                      onChange={(e) => handleProductChange('price', e.target.value)}
                      className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                      placeholder="₹480"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">Description</label>
                    <textarea
                      value={newProduct.description}
                      onChange={(e) => handleProductChange('description', e.target.value)}
                      rows="4"
                      className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                      placeholder="Enter a premium product description"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">Product image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none"
                    />
                    <p className="mt-2 text-xs text-espresso/70">Recommended size: 1200x800, max 250KB.</p>
                  </div>
                  {previewImage && (
                    <div className="overflow-hidden rounded-[2rem] border border-espresso/10">
                      <img src={previewImage} alt="Preview" className="h-64 w-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="button"
                      onClick={saveProduct}
                      className="inline-flex flex-1 items-center justify-center rounded-full bg-espresso px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-cream shadow-xl transition hover:bg-espresso/90"
                    >
                      {editingProductId ? 'Update product' : 'Save product'}
                    </button>
                    {editingProductId && (
                      <button
                        type="button"
                        onClick={resetProductForm}
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-espresso/10 bg-white px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-espresso shadow-sm transition hover:bg-espresso/5"
                      >
                        Cancel edit
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2.5rem] border border-espresso/10 bg-white p-8 shadow-premium">
                  <h2 className="text-2xl font-semibold text-espresso">Existing products</h2>
                  <p className="mt-3 text-sm leading-7 text-espresso/75">
                    Products added here appear in the local admin store so you can preview and manage the collection.
                  </p>
                  <div className="mt-8 grid gap-5">
                    {products.map((product) => (
                      <div key={product.id} className="rounded-[2rem] border border-espresso/10 bg-cream p-4 shadow-sm">
                        <div className="flex items-center gap-4">
                          <img src={product.image} alt={product.name} className="h-20 w-20 rounded-3xl object-cover" />
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-espresso">{product.name}</h3>
                            <p className="text-sm text-espresso/70">{product.price}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => startEditProduct(product)}
                              className="rounded-full bg-gold/10 px-4 py-2 text-sm font-semibold text-espresso transition hover:bg-gold/20"
                            >
                              Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => removeProduct(product.id)}
                              className="rounded-full bg-espresso/10 px-4 py-2 text-sm font-semibold text-espresso transition hover:bg-espresso/20"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid gap-12 xl:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="rounded-[2.5rem] border border-espresso/10 bg-white p-8 shadow-premium">
                <h2 className="text-2xl font-semibold text-espresso">New customer order</h2>
                <p className="mt-3 text-sm leading-7 text-espresso/75">
                  Use this form to capture customer contact details and order requests with email or phone number.
                </p>

                <div className="mt-8 space-y-5">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">Customer name</label>
                    <input
                      value={newOrder.customerName}
                      onChange={(e) => handleOrderChange('customerName', e.target.value)}
                      className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                      placeholder="Your customer name"
                    />
                  </div>
                  <div className="grid gap-5 md:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-espresso">Email</label>
                      <input
                        value={newOrder.email}
                        onChange={(e) => handleOrderChange('email', e.target.value)}
                        className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                        placeholder="customer@example.com"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-semibold text-espresso">Phone</label>
                      <input
                        value={newOrder.phone}
                        onChange={(e) => handleOrderChange('phone', e.target.value)}
                        className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                        placeholder="+91 93984 85037"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">Product requested</label>
                    <select
                      value={newOrder.product}
                      onChange={(e) => handleOrderChange('product', e.target.value)}
                      className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                    >
                      <option value="">Select product</option>
                      {products.map((product) => (
                        <option key={product.id} value={product.name}>{product.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-espresso">Additional notes</label>
                    <textarea
                      value={newOrder.message}
                      onChange={(e) => handleOrderChange('message', e.target.value)}
                      rows="4"
                      className="w-full rounded-3xl border border-espresso/10 bg-cream px-4 py-3 text-sm text-espresso outline-none transition focus:border-gold/70 focus:ring-2 focus:ring-gold/20"
                      placeholder="Enter delivery preferences, event date, or custom requests"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={submitOrder}
                    className="inline-flex w-full items-center justify-center rounded-full bg-espresso px-6 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-cream shadow-xl transition hover:bg-espresso/90"
                  >
                    Save order
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-[2.5rem] border border-espresso/10 bg-white p-8 shadow-premium">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-semibold text-espresso">Order inbox</h2>
                      <p className="mt-3 text-sm leading-7 text-espresso/75">
                        View customer orders captured through the admin form.
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={clearOrders}
                      className="rounded-full bg-espresso/10 px-4 py-3 text-sm font-semibold text-espresso transition hover:bg-espresso/20"
                    >
                      Clear all
                    </button>
                  </div>

                  <div className="mt-8 space-y-4">
                    {orders.length ? (
                      orders.map((order) => (
                        <div key={order.id} className="rounded-[2rem] border border-espresso/10 bg-cream p-5 shadow-sm">
                          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                              <h3 className="text-lg font-semibold text-espresso">{order.customerName}</h3>
                              <p className="text-sm text-espresso/70">{order.product}</p>
                            </div>
                            <div className="text-sm text-espresso/70">
                              {new Date(order.submittedAt).toLocaleString()}
                            </div>
                          </div>
                          <div className="mt-4 grid gap-3 sm:grid-cols-2">
                            <p><span className="font-semibold text-espresso">Email:</span> {order.email || '—'}</p>
                            <p><span className="font-semibold text-espresso">Phone:</span> {order.phone || '—'}</p>
                          </div>
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <span className={`rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.24em] ${
                              order.delivered ? 'bg-green-100 text-green-700' : 'bg-gold/10 text-cocoa'
                            }`}>
                              {order.delivered ? 'Delivered' : 'Pending'}
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleOrderDelivered(order.id)}
                              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                                order.delivered ? 'bg-espresso/10 text-espresso hover:bg-espresso/20' : 'bg-espresso text-cream hover:bg-espresso/90'
                              }`}
                            >
                              {order.delivered ? 'Mark pending' : 'Mark delivered'}
                            </button>
                          </div>
                          {order.message && <p className="mt-3 text-sm leading-6 text-espresso/75">{order.message}</p>}
                        </div>
                      ))
                    ) : (
                      <p className="rounded-[2rem] border border-espresso/10 bg-cream p-6 text-sm text-espresso/70">
                        No orders recorded yet. Use the order form to add customer requests with email or phone.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

export default Admin;
