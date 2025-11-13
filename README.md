# 🛒 ProductLens - AI-Powered Product Search & Health Analysis

An intelligent product search and nutrition analysis application powered by Google Gemini AI, Google Custom Search API, and USDA Food Database.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR-USERNAME/productlens)

## ✨ Features

- 🔍 **Smart Product Search** - Search any product and get detailed information
- 📸 **AI Lens Scanner** - Upload or capture product images for instant recognition
- 🍎 **Health Analysis** - Complete nutritional information and health scores
- ⚖️ **Product Comparison** - Compare two products side-by-side
- 🤖 **AI Chatbot** - Ask questions about products and get instant answers
- 🖼️ **Real Images** - Google Custom Search integration for authentic product photos

## 🚀 Quick Deploy

### Deploy to Vercel (2 minutes - No coding required!)

1. Click the "Deploy with Vercel" button above
2. Connect your GitHub account
3. Click "Deploy"
4. Done! Your app is live at `https://your-project.vercel.app`

### Manual Deployment

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR-USERNAME/productlens.git
git push -u origin main
```

#### Step 2: Deploy to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click "Deploy"
4. Live in 1 minute!

## 📁 Project Structure

```
productlens/
├── index.html                    # Main application (Homepage + Search)
├── lens_search.html              # AI Camera Scanner
├── product_compare.html          # Product Comparison Tool
├── health_analysis.html          # Health & Nutrition Analysis
├── chatbot.html                  # AI Product Chatbot
├── .gitignore                    # Git ignore file
├── vercel.json                   # Vercel configuration
└── README.md                     # This file
```

## 🔑 API Keys (Already Configured)

The app uses these API keys (already included for demo):

- ✅ Google Gemini AI
- ✅ Google Custom Search API
- ✅ USDA Food Database
- ✅ Pexels Images

**Ready to deploy - No configuration needed!**

## 💰 Monetize with Ads

After deployment:
1. Apply for [Google AdSense](https://www.google.com/adsense)
2. Submit your live URL
3. Add AdSense code
4. Start earning ₹5,000-₹50,000/month!

See `ads_integration_guide.html` for details.

## 🛠️ Local Development (Optional)

If you want to run locally with a proxy server:

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Install dependencies:
```bash
npm install
```

3. Start server:
```bash
npm start
```

4. Open `http://localhost:3000`

## 📊 API Limits

- Google Custom Search: 100 searches/day (free)
- Google Gemini: 60 requests/minute (free)
- USDA Food API: 1000 requests/hour (free)
- Pexels API: 200 requests/hour (free)

## 🐛 Troubleshooting

### Images Not Loading?
- Check Google Custom Search Engine settings
- Ensure "Image Search" is enabled
- See `google_search_fix.html` for help

### API Quota Exceeded?
- Wait 24 hours for reset
- Or create new Google Cloud project
- See `new_google_api_setup.html` for instructions

## 📱 Features

1. **Product Search** - Search products, view images, get nutrition info
2. **AI Scanner** - Upload/capture images for instant product recognition
3. **Health Analysis** - Complete nutritional breakdown & health scores
4. **Comparison** - Compare 2 products side-by-side
5. **Chatbot** - AI-powered product Q&A

## 🎯 Next Steps

After deployment:
1. ✅ Test all features on live URL
2. ✅ Apply for Google AdSense
3. ✅ Share and promote
4. ✅ Start earning! 💰

## 📄 License

Open source - Free for personal and commercial use

---

**Made with ❤️ by Divyansh Raj Soni**

**Live Demo:** https://your-app.vercel.app (Update after deployment)
