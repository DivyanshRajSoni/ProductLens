# ProductLens - Indian Product Recognition System
## 🇮🇳 2025 Setup Guide

---

## ✅ What's Already Working (FREE!)

### 1. **Open Food Facts API** ✅
- **Status:** Active & FREE
- **No API Key Required!**
- **Features:**
  - Indian product database
  - Nutritional information
  - Product images
  - Ingredients list
  - Store availability

### 2. **Shopping Links** ✅
Your app already connects to these stores:
- **Amazon India** (largest selection)
- **Flipkart** (India's #1)
- **Meesho** (fast growing, budget-friendly)
- **BigBasket** (groceries)
- **Blinkit** (10-minute delivery)
- **Myntra** (fashion)

---

## 💰 Optional: Earn Money with Affiliate Links

### **Option 1: Amazon Associates India** (Recommended)
**Best for:** Direct signup, easy approval

**Steps:**
1. Go to: https://affiliate.amazon.in/
2. Create free account (email needed)
3. Get your **Associate Tag**
4. Add to code (line 329):
   ```javascript
   var amazonIndiaTag = 'YOUR_TAG_HERE';
   ```
5. **Earnings:** 1-20% commission per sale

---

### **Option 2: Cuelinks** (Multi-Store Access)
**Best for:** Access to 800+ stores including Flipkart

**Steps:**
1. Go to: https://www.cuelinks.com/
2. Free signup (no approval needed)
3. Get your **Cuelinks ID**
4. Add to code (line 331):
   ```javascript
   var cuelinksId = 'YOUR_CUELINKS_ID';
   ```
5. **Earnings:** Access to Flipkart, Myntra, and 800+ stores

**Why Cuelinks?**
- Flipkart direct affiliate program closed in 2025
- Cuelinks gives access to Flipkart + many others
- Automatic link conversion
- Single dashboard for all stores

---

### **Option 3: Meesho Affiliate** (Rising Star)
**Best for:** High commissions on budget products

**Steps:**
1. Go to: https://www.meesho.com/supplier
2. Join as reseller (free)
3. **Earnings:** Up to 15% commission

---

## 💰 Price Comparison APIs (NEW!)

You now have **3 FREE options** for price comparison:

### **Option 1: DataForSEO** (BEST! - 50,000 FREE credits)
**Steps:**
1. Go to: https://dataforseo.com/free-trial
2. Sign up (free, no credit card!)
3. Get **50,000 FREE API credits**
4. Add credentials to code (line 328-329):
   ```javascript
   var dataForSeoLogin = 'your@email.com';
   var dataForSeoPassword = 'your_password';
   ```
5. **Benefit:** 50,000 searches = good for months!

### **Option 2: ScraperAPI** (5,000 FREE credits)
**Steps:**
1. Go to: https://www.scraperapi.com/signup
2. Free signup
3. Get **5,000 FREE credits**
4. Add to code (line 332):
   ```javascript
   var scraperApiKey = 'YOUR_API_KEY';
   ```
5. **Benefit:** Easier setup than DataForSEO

### **Option 3: SerpAPI** (Already configured!)
- **Already working** with your existing key
- **100 free searches/month**
- No setup needed!
- Works as fallback automatically

### **Smart Fallback System:**
Your app tries all 3 APIs automatically:
1. DataForSEO first (if configured)
2. ScraperAPI second (if configured)
3. SerpAPI third (always works)
4. Manual search links (if all fail)

**You're always covered!** Even without any API keys, manual search links will show up.

---

## 🚀 How to Use Your App

### **Test It Now:**
1. Open `ai_studio_code (6).html` in browser
2. Search for any product:
   - **Maaza** (drink)
   - **Parle-G** (biscuits)
   - **Amul Milk**
   - **Maggi**
   - **Britannia Good Day**
   - Any Indian product!

3. **What You'll Get:**
   - ✅ Product images (automatic)
   - ✅ Nutritional data (from Open Food Facts)
   - ✅ Health information
   - ✅ Ingredients list
   - ✅ Price comparisons
   - ✅ Direct shopping links

4. **Click on Store Links:**
   - Opens product search on that store
   - User can buy directly
   - (If you added affiliate IDs, you earn commission!)

---

## 🎯 2025 Reality Check

### ❌ **What Changed in 2025:**
- **Flipkart Direct Affiliate:** Closed/Difficult to access
- **Solution:** Use Cuelinks or EarnKaro networks

### ✅ **What's Best in 2025:**
1. **Amazon Associates** - Still the easiest & best
2. **Cuelinks** - Best for multi-store access
3. **Meesho** - Fast growing, good commissions

---

## 📝 Technical Details

### **APIs Used:**
1. **Open Food Facts API**
   - Endpoint: `https://world.openfoodfacts.org/`
   - Rate Limit: None (free usage)
   - No authentication needed

2. **USDA API** (Fallback)
   - For international products
   - Already configured in your code

3. **Pexels API** (Images)
   - Already configured
   - Fallback option

---

## 🔧 Quick Fixes

### **If nutritional data doesn't load:**
- Open browser console (F12)
- Check: "Found in Open Food Facts!" message
- If not found, it will try USDA API automatically

### **If images don't load:**
- Pexels API will try to fetch automatically
- Some products may not have images (normal)

### **If store links don't work:**
- They work as search links (opens search page)
- User can find the exact product there

---

## 💡 Pro Tips

1. **Best Product Search:**
   - Use brand names: "Amul", "Britannia"
   - Use full product names: "Maaza Mango Drink"

2. **Earning More:**
   - Sign up for both Amazon & Cuelinks
   - Amazon for direct, Cuelinks for other stores
   - Track which stores users click most

3. **Better Results:**
   - Open Food Facts is best for packaged foods
   - Works great for Indian products
   - International products use USDA fallback

---

## 📞 Need Help?

### **Resources:**
- Amazon Associates: https://affiliate.amazon.in/resource-center
- Cuelinks Help: https://www.cuelinks.com/help
- Open Food Facts: https://world.openfoodfacts.org/

### **Common Issues:**
- **"No nutritional data"** → Product not in database, try searching similar products
- **"Images not loading"** → Check Pexels API key in code
- **"Store links not working"** → Links work as search, user needs to find exact product

---

## 🎉 You're All Set!

Your app is ready to use with:
- ✅ FREE APIs (no keys needed for basic features)
- ✅ Indian product support
- ✅ Multiple store links
- ✅ Nutritional data
- ✅ Product images

**To earn money:** Just add your Amazon Associate Tag or Cuelinks ID!

---

**Last Updated:** January 2025
**Version:** 2.0 (2025 Edition)
