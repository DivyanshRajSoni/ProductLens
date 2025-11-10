// Vercel Serverless Function - SerpApi Price Search Proxy
export default async function handler(req, res) {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const serpKey = process.env.SERPAPI_KEY;
  if (!serpKey) {
    return res.status(500).json({ error: 'SERPAPI_KEY not configured' });
  }

  try {
    const params = new URLSearchParams({
      engine: 'google_shopping',
      q: query,
      api_key: serpKey,
      hl: 'en'
    });

    const response = await fetch(`https://serpapi.com/search.json?${params.toString()}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: 'SerpApi error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('SerpApi proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
