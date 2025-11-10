// Vercel Serverless Function - USDA Proxy
export default async function handler(req, res) {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const usdaKey = process.env.USDA_KEY;
  if (!usdaKey) {
    return res.status(500).json({ error: 'USDA_KEY not configured' });
  }

  try {
    const response = await fetch(
      `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(query)}&pageSize=1&api_key=${usdaKey}`
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'USDA API error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('USDA proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
