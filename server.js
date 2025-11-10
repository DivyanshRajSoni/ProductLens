require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const PORT = process.env.PORT || 3000;

// Health
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

// SerpApi proxy for Google Shopping / price comparisons
app.get('/api/search-price', async (req, res) => {
  const q = req.query.q || req.query.query;
  if (!q) return res.status(400).json({ error: 'Missing query parameter' });

  const serpKey = process.env.SERPAPI_KEY;
  if (!serpKey) return res.status(500).json({ error: 'Server not configured: missing SERPAPI_KEY' });

  const params = new URLSearchParams({ engine: 'google_shopping', q: q, api_key: serpKey, hl: 'en' });
  const url = `https://serpapi.com/search.json?${params.toString()}`;

  try {
    const r = await fetch(url);
    if (!r.ok) return res.status(502).json({ error: `Upstream error ${r.status}` });
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    console.error('SerpApi proxy error', err);
    return res.status(500).json({ error: 'SerpApi proxy failed' });
  }
});

// Pexels proxy for images
app.get('/api/pexels', async (req, res) => {
  const q = req.query.q || req.query.query;
  if (!q) return res.status(400).json({ error: 'Missing query parameter' });

  const pexelsKey = process.env.PEXELS_KEY;
  if (!pexelsKey) return res.status(500).json({ error: 'Server not configured: missing PEXELS_KEY' });

  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=6&orientation=square`;

  try {
    const r = await fetch(url, { headers: { Authorization: pexelsKey } });
    if (!r.ok) return res.status(502).json({ error: `Upstream error ${r.status}` });
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    console.error('Pexels proxy error', err);
    return res.status(500).json({ error: 'Pexels proxy failed' });
  }
});

// USDA proxy for nutritional info
app.get('/api/usda', async (req, res) => {
  const q = req.query.q || req.query.query;
  if (!q) return res.status(400).json({ error: 'Missing query parameter' });

  const usdaKey = process.env.USDA_KEY;
  if (!usdaKey) return res.status(500).json({ error: 'Server not configured: missing USDA_KEY' });

  const url = `https://api.nal.usda.gov/fdc/v1/foods/search?query=${encodeURIComponent(q)}&pageSize=1&api_key=${usdaKey}`;

  try {
    const r = await fetch(url);
    if (!r.ok) return res.status(502).json({ error: `Upstream error ${r.status}` });
    const data = await r.json();
    return res.json(data);
  } catch (err) {
    console.error('USDA proxy error', err);
    return res.status(500).json({ error: 'USDA proxy failed' });
  }
});

// Google Custom Search API for images (web search)
app.get('/api/google-images', async (req, res) => {
  try {
    const query = req.query.q || req.query.query;
    if (!query) return res.status(400).json({ error: 'Missing query parameter' });

    const googleApiKey = process.env.GOOGLE_SEARCH_API_KEY || 'AIzaSyCVSX0FQu6oGIDjcplnyi9cz9jJgfw8awc';
    // Create a custom search engine at: https://programmablesearchengine.google.com/
    // For now, using general web search
    const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID || '017576662512468239146:omuauf_lfve';

    const url = `https://www.googleapis.com/customsearch/v1?key=${googleApiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}&searchType=image&num=4&imgSize=medium`;

    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Google Search API error: ${response.status}`);
      return res.status(502).json({ error: `Google API error ${response.status}` });
    }

    const data = await response.json();

    // Extract image URLs
    const images = data.items ? data.items.map(item => ({
      url: item.link,
      thumbnail: item.image?.thumbnailLink || item.link,
      title: item.title,
      source: item.displayLink
    })) : [];

    return res.json({ images });
  } catch (err) {
    console.error('Google Images proxy error:', err);
    return res.status(500).json({ error: 'Google Images proxy failed' });
  }
});

// Freepik API proxy endpoint
app.get('/api/freepik', async (req, res) => {
  try {
    const query = req.query.q || req.query.query;
    if (!query) return res.status(400).json({ error: 'Missing query parameter' });

    const freepikKey = process.env.FREEPIK_API_KEY || 'FPSX1c8feb7a24f70ef9e4d7b845ec1d8460';

    const url = `https://api.freepik.com/v1/resources?term=${encodeURIComponent(query)}&filters[content_type]=photo&page=1&limit=2`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'x-freepik-api-key': freepikKey
      }
    });

    if (!response.ok) {
      console.error(`Freepik API error: ${response.status}`);
      return res.status(502).json({ error: `Freepik API error ${response.status}` });
    }

    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('Freepik proxy error:', err);
    return res.status(500).json({ error: 'Freepik proxy failed' });
  }
});

// Gemini AI product recognition endpoint
app.post('/api/gemini/recognize', async (req, res) => {
  try {
    const { image } = req.body; // Expecting base64 image data

    if (!image) {
      return res.status(400).json({ error: 'Missing image data' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return res.status(500).json({ error: 'Server not configured: missing GEMINI_API_KEY' });
    }

    // Use Gemini Pro Vision model
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Remove data URL prefix if present (e.g., "data:image/jpeg;base64,")
    const base64Data = image.replace(/^data:image\/\w+;base64,/, '');

    const imageParts = [
      {
        inlineData: {
          data: base64Data,
          mimeType: 'image/jpeg'
        }
      }
    ];

    const prompt = `You are a product recognition AI assistant. Analyze this product image and provide detailed information in JSON format.

Your response MUST be valid JSON with this exact structure:
{
  "productName": "Full product name including brand",
  "brand": "Brand name",
  "category": "Product category (e.g., Beverage, Snack, Food, etc.)",
  "description": "Brief 1-2 sentence description",
  "confidence": "high/medium/low",
  "searchQuery": "Best search term to find nutritional info (e.g., 'coca cola', 'dairy milk chocolate')"
}

Important:
- Be specific with the product name and brand
- Use the exact brand and product name visible on the package
- For Indian products, identify the brand correctly (e.g., Parle-G, Kurkure, Maaza)
- If you cannot identify the product clearly, set confidence to "low"
- Return ONLY the JSON object, no additional text`;

    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    // Parse JSON from the response
    let productInfo;
    try {
      // Extract JSON from markdown code blocks if present
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      productInfo = JSON.parse(jsonText.trim());
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      return res.status(500).json({
        error: 'Failed to parse product information',
        rawResponse: text
      });
    }

    return res.json(productInfo);

  } catch (err) {
    console.error('Gemini API error:', err);
    return res.status(500).json({
      error: 'Product recognition failed',
      details: err.message
    });
  }
});

// Gemini AI text generation endpoint (for product descriptions, health info, etc.)
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Missing prompt' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return res.status(500).json({ error: 'Server not configured: missing GEMINI_API_KEY' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return res.json({ text });

  } catch (err) {
    console.error('Gemini generation error:', err);
    return res.status(500).json({
      error: 'Text generation failed',
      details: err.message
    });
  }
});

// Gemini AI price comparison and insights
app.post('/api/gemini/price-insights', async (req, res) => {
  try {
    const { productName, priceData } = req.body;

    if (!productName) {
      return res.status(400).json({ error: 'Missing product name' });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      return res.status(500).json({ error: 'Server not configured: missing GEMINI_API_KEY' });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Create a prompt for price analysis
    const prompt = `You are a smart shopping assistant. Analyze the following product and price information:

Product: ${productName}
${priceData ? `Available Prices:\n${JSON.stringify(priceData, null, 2)}` : 'Price data not available'}

Provide a detailed analysis in JSON format:
{
  "bestDeal": {
    "store": "Store name with best price",
    "price": "Best price",
    "reason": "Why this is the best deal"
  },
  "priceInsights": "Brief analysis of price range and value (2-3 sentences)",
  "recommendations": [
    "Shopping tip 1",
    "Shopping tip 2",
    "Shopping tip 3"
  ],
  "alternativeProducts": [
    "Similar product suggestion 1",
    "Similar product suggestion 2"
  ],
  "savingTips": "How to save money on this purchase"
}

Return ONLY valid JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse JSON from the response
    let insights;
    try {
      const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/```\n([\s\S]*?)\n```/);
      const jsonText = jsonMatch ? jsonMatch[1] : text;
      insights = JSON.parse(jsonText.trim());
    } catch (parseError) {
      console.error('Failed to parse Gemini price insights:', text);
      return res.status(500).json({
        error: 'Failed to parse price insights',
        rawResponse: text
      });
    }

    return res.json(insights);

  } catch (err) {
    console.error('Gemini price insights error:', err);
    return res.status(500).json({
      error: 'Price insights generation failed',
      details: err.message
    });
  }
});

app.listen(PORT, () => console.log(`API proxy listening on http://localhost:${PORT}`));
