import { useState, useRef, useEffect } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi — ask me about product composition, calories, or materials used.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text) return;

    const userMsg = { role: 'user', content: text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed');

      const assistantMsg = data.message || { role: 'assistant', content: 'No response' };
      setMessages((m) => [...m, assistantMsg]);
    } catch (err) {
      console.error('Chat error', err);
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
    <div className="w-80 max-w-full rounded-2xl border border-espresso/10 bg-white shadow-lg">
      <div className="flex items-center justify-between rounded-t-2xl bg-espresso/5 px-4 py-3">
        <div className="text-sm font-semibold text-espresso">Assistant</div>
        <div className="text-xs text-espresso/70">Product knowledge</div>
      </div>
      <div ref={containerRef} className="h-64 overflow-auto p-3 text-sm">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`${m.role === 'user' ? 'bg-gold text-espresso' : 'bg-cream text-espresso/90'} rounded-xl px-3 py-2 max-w-[80%]`}>
              {m.content}
            </div>
          </div>
        ))}
      </div>
      <div className="p-3">
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
  );
}
