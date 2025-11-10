// Vercel Serverless Function - Pexels Proxy
export default async function handler(req, res) {
  const { query } = req.query;
  
  if (!query) {
    return res.status(400).json({ error: 'Missing query parameter' });
  }

  const pexelsKey = process.env.PEXELS_KEY;
  if (!pexelsKey) {
    return res.status(500).json({ error: 'PEXELS_KEY not configured' });
  }

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=6&orientation=square`,
      {
        headers: { Authorization: pexelsKey }
      }
    );

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Pexels API error' });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Pexels proxy error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
