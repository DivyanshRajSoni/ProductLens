# Vercel Deployment Guide for ProductLens

## Quick Setup

### 1. Install Vercel CLI (if not installed)
```bash
npm install -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy
```bash
vercel
```

## Environment Variables Setup

After deployment, add these environment variables in Vercel dashboard:

1. Go to your project on https://vercel.com
2. Click on **Settings** → **Environment Variables**
3. Add these variables:

| Variable Name | Value |
|--------------|-------|
| `PEXELS_KEY` | Your Pexels API key |
| `USDA_KEY` | Your USDA API key |
| `SERPAPI_KEY` | Your SerpApi key |

### Your Keys:
- PEXELS_KEY: `OxpbOVvefBbl3yY3e0hhd4Bku2Q1iGU9GuCwFmSvZEsWMgEyvbtLKBEn`
- USDA_KEY: `A2xRyK7pcTVNuok2k1K71Ijh54oOG5LRstZuX8xr`
- SERPAPI_KEY: `2d80ef67ac956615b846ecfe1698adaedc3b562f9eb732267b9dddaa89fa313d`

## API Endpoints

After deployment, your API endpoints will be:
- `https://your-domain.vercel.app/api/health`
- `https://your-domain.vercel.app/api/pexels?query=product`
- `https://your-domain.vercel.app/api/usda?query=product`
- `https://your-domain.vercel.app/api/search-price?query=product`

## Files Structure

```
/
├── api/
│   ├── health.js          # Health check endpoint
│   ├── pexels.js          # Pexels image proxy
│   ├── usda.js            # USDA nutrition data proxy
│   └── search-price.js    # SerpApi price comparison proxy
├── index.html             # Main application
├── vercel.json            # Vercel configuration
└── package.json           # Dependencies
```

## Troubleshooting

### Error: "Cannot read properties of undefined"
- ✅ Fixed: Created proper serverless functions in `/api` folder
- ✅ Fixed: Added correct `vercel.json` configuration

### Error: "Environment variable not found"
- Add environment variables in Vercel dashboard
- Redeploy after adding variables

### API endpoints not working
- Check if environment variables are set
- Check Vercel function logs in dashboard

## Production Deployment

```bash
vercel --prod
```

## GitHub Integration

Push changes to GitHub and Vercel will auto-deploy:
```bash
git add .
git commit -m "Add Vercel serverless functions"
git push origin main
```

Vercel will automatically deploy on every push to `main` branch.
