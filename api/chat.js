const OPENAI_KEY = process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY;
const MODEL = process.env.OPENAI_MODEL || 'gpt-3.5-turbo';

export default async function handler(req, res) {
  if (!OPENAI_KEY) {
    return res.status(500).json({ error: 'OpenAI API key not configured. Set OPENAI_API_KEY.' });
  }

  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).end();
    }

    const body = req.body || {};
    const userMessages = body.messages || [];

    const systemPrompt = `You are a helpful assistant specializing in product composition, ingredients, materials, and calorie information. Answer user questions precisely, cite when uncertain, and ask clarifying questions if the question is ambiguous. Keep answers concise and factual.`;

    const payload = {
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...userMessages,
      ],
      max_tokens: 700,
      temperature: 0.2,
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error('OpenAI error:', text);
      return res.status(response.status).json({ error: 'OpenAI API error', detail: text });
    }

    const data = await response.json();
    const message = data.choices?.[0]?.message ?? { role: 'assistant', content: '' };
    return res.status(200).json({ message });
  } catch (err) {
    console.error('Chat API error:', err);
    return res.status(500).json({ error: err.message || 'Unknown error' });
  }
}
