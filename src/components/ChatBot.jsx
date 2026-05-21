import { useState, useRef, useEffect } from 'react';
import { FaComments, FaTimes } from 'react-icons/fa';

export default function ChatBot({ products = [], selectedProduct = null }) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi — ask me about product composition, calories, or materials used.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const containerRef = useRef(null);
  const chatRef = useRef(null);

  const buildProductContext = () => {
    const productList = selectedProduct ? [selectedProduct] : products;
    if (!productList || productList.length === 0) {
      return '';
    }

    return productList.slice(0, 10).map((product) => {
      const name = product.name || 'Unnamed product';
      const price = product.price ? `Price: ${product.price}` : 'Price unknown';
      const description = product.description ? product.description : 'No description provided.';
      const calories = product.calories ? `Calories: ${product.calories}` : '';
      const materials = product.materials ? `Materials: ${product.materials}` : '';
      return `• ${name}: ${price}. ${description}${calories ? ` ${calories}.` : ''}${materials ? ` ${materials}.` : ''}`;
    }).join('\n');
  };

  useEffect(() => {
    if (selectedProduct) {
      setOpen(true);
    }
  }, [selectedProduct]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return undefined;

    const handleClickOutside = (event) => {
      if (chatRef.current && !chatRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: 'user', content: text };
    // Optimistic UI
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);
    setError('');

    try {
      const payloadMessages = [...messages, userMsg];
      const productContext = buildProductContext();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: payloadMessages, productContext }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || data.detail || 'Chat request failed');
      }

      const assistantMsg = data.message || { role: 'assistant', content: 'No response' };
      setMessages((m) => [...m, assistantMsg]);
    } catch (err) {
      console.error('Chat error', err);
      setError(err.message || 'Chat service unavailable');
      setMessages((m) => [...m, { role: 'assistant', content: 'Sorry, I could not reach the chat service.' }]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="z-50" ref={chatRef}>
      {!open ? (
        <button
          aria-label="Open chat"
          onClick={() => setOpen(true)}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-espresso text-cream shadow-lg"
        >
          <FaComments />
        </button>
      ) : (
        <div className="w-80 max-w-full rounded-2xl border border-espresso/10 bg-white shadow-lg">
          <div className="flex items-center justify-between rounded-t-2xl bg-espresso/5 px-4 py-3">
            <div>
              <div className="text-sm font-semibold text-espresso">Assistant</div>
              {selectedProduct && (
                <div className="text-xs text-espresso/70">Product: {selectedProduct.name}</div>
              )}
            </div>
            <div className="flex items-center gap-2">
              <div className="text-xs text-espresso/70">Product knowledge</div>
              <button aria-label="Close chat" onClick={() => setOpen(false)} className="ml-2 text-espresso/70">
                <FaTimes />
              </button>
            </div>
          </div>
          <div ref={containerRef} className="h-64 overflow-auto p-3 text-sm">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`${m.role === 'user' ? 'bg-gold text-espresso' : 'bg-cream text-espresso/90'} rounded-xl px-3 py-2 max-w-[80%]`}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="text-sm text-espresso/70">Thinking…</div>
            )}
          </div>
          <div className="p-3">
            {error && <div className="mb-2 text-sm text-red-600">{error}</div>}
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              rows={2}
              placeholder="Ask about ingredients, calories, materials..."
              className="w-full resize-none rounded-xl border border-espresso/10 bg-cream px-3 py-2 text-sm text-espresso outline-none"
            />
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={sendMessage}
                disabled={loading}
                className="ml-auto inline-flex items-center justify-center rounded-full bg-espresso px-4 py-2 text-xs font-semibold text-cream disabled:opacity-60"
              >
                {loading ? 'Thinking…' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
