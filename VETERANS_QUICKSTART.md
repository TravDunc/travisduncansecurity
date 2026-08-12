# 🎖️ Veterans Section - Quick Start Guide

Get your new Veterans section up and running in 2 minutes!

---

## ⚡ Quick Start (2 Commands)

### Terminal 1 - Backend API:
```powershell
cd C:\Code_Scripts\Python\va-disability-calculator
python -m src.project_name.api
```
✅ API runs on **http://localhost:5000**

### Terminal 2 - Frontend:
```powershell
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio
npm run dev
```
✅ Portfolio runs on **http://localhost:5173**

---

## 🌐 Test Your New Pages

| Page | URL | What You'll See |
|------|-----|-----------------|
| **Home** | http://localhost:5173/ | Your original portfolio (unchanged) |
| **Veterans** | http://localhost:5173/veterans | Resources page with calculator preview |
| **Calculator** | http://localhost:5173/veterans/calculator | Full interactive calculator |

---

## 🧪 Quick Test Checklist

### 1. Navigation ✅
- [ ] Click "Veterans" in navbar (turns green)
- [ ] Navigate to Veterans page
- [ ] Click "Launch Calculator" button
- [ ] Navigate back using "Home" link

### 2. Body Diagram ✅
- [ ] Hover over body parts (see labels)
- [ ] Click "Left Knee" → enter 30% rating
- [ ] Click "Right Knee" → enter 20% rating
- [ ] See both knees highlighted in green

### 3. Calculator ✅
- [ ] Add conditions using body diagram
- [ ] Click "+ Add Non-Body Condition" → add PTSD (50%)
- [ ] Fill in dependents: spouse + 2 children
- [ ] Click "Calculate Rating & Payment"
- [ ] Verify results show:
  - Combined rating
  - Monthly payment ($$$)
  - Bilateral factor (if both knees added)

### 4. Resources Page ✅
- [ ] Scroll through all sections
- [ ] Click certification categories (expand/collapse)
- [ ] Click external links (open in new tabs)
- [ ] Check mobile view (resize browser)

### 5. CSV Download ✅
- [ ] Add 2-3 conditions
- [ ] Calculate results
- [ ] Click download icon
- [ ] Open CSV file → verify data

---

## 🎨 What's New

### Components Built:
- ✅ **BodyDiagram** - Interactive SVG body with clickable parts
- ✅ **VACalculatorFull** - Complete calculator with API integration
- ✅ **VACalculatorPreview** - Featured widget on resources page
- ✅ **VeteransPage** - Comprehensive resources page
- ✅ **Military Theme** - Green color palette throughout

### Features:
- ✅ Bilateral factor detection (both sides of body)
- ✅ Dependent support (spouse, children, parents)
- ✅ Real-time API calculations
- ✅ CSV export functionality
- ✅ Mobile-responsive design
- ✅ 50+ veteran resources organized by category

---

## 🎯 Quick Demo Path

**Try this flow to see all features:**

1. **Start:** http://localhost:5173/veterans
2. **Scroll down** → See resources organized by category
3. **Click "Launch Calculator"** → Go to full calculator
4. **Click body parts:**
   - Right Shoulder: 30%
   - Left Shoulder: 20%
5. **Add non-body condition:**
   - PTSD: 50%
6. **Add dependents:**
   - ☑ Spouse
   - Children under 18: 2
7. **Calculate** → See:
   - Combined Rating: 70%
   - Monthly Payment: ~$2,066/mo
   - ⚡ Bilateral Factor Applied
8. **Download CSV** → Get your data

---

## 📱 Mobile Testing

Resize your browser to test responsive design:

| Width | View | Features |
|-------|------|----------|
| **< 768px** | Mobile | Single column, stacked cards, touch-friendly |
| **768-1023px** | Tablet | 2 columns, enhanced layout |
| **> 1024px** | Desktop | Full features, side-by-side |

---

## 🐛 Troubleshooting

### API Not Connecting?
```powershell
# Check API is running:
curl http://localhost:5000/health

# Should return: {"status":"healthy"}
```

### React Errors?
```powershell
# Clear node modules and reinstall:
rm -rf node_modules
npm install
npm run dev
```

### Port Already in Use?
```powershell
# Kill process on port 5173:
netstat -ano | findstr :5173
taskkill /PID <process_id> /F
```

---

## 📂 New File Structure

```
portfolio/
├── src/
│   ├── pages/
│   │   ├── HomePage.jsx              ✨ NEW
│   │   └── VeteransPage.jsx          ✨ NEW
│   ├── components/
│   │   ├── veterans/                 ✨ NEW FOLDER
│   │   │   ├── BodyDiagram.jsx
│   │   │   ├── VACalculatorFull.jsx
│   │   │   └── VACalculatorPreview.jsx
│   │   └── Navbar.jsx                ✅ UPDATED
│   ├── data/
│   │   └── bodyPartMapping.js        ✨ NEW
│   └── App.jsx                       ✅ UPDATED
└── tailwind.config.js                ✅ UPDATED
```

---

## 🎉 You're Ready!

Your Veterans section is fully functional with:

✅ **Interactive calculator** with body diagram  
✅ **Bilateral factor** auto-detection  
✅ **50+ resources** for veterans  
✅ **Mobile-responsive** design  
✅ **Military green** branding  

---

## 💡 Tips

1. **Test bilateral detection:** Add both knees/shoulders to see the gold "⚡ Bilateral Factor" badge
2. **Try different ratings:** 10%, 30%, 50%, 70% to see how payments scale
3. **Mobile view:** Best tested on actual mobile device or Chrome DevTools
4. **Resources:** All external links have been vetted and open in new tabs

## 📚 Additional Documentation

- [Project Summary](./docs/PROJECT_SUMMARY.md) - Complete technical overview
- [Security Analysis](./docs/SECURITY_ANALYSIS.md) - OWASP Top 10 compliance
- [Deployment Guide](./docs/DEPLOYMENT_GUIDE.md) - Production deployment
- [Deployment Checklist](./docs/DEPLOYMENT_CHECKLIST.md) - Pre-deployment verification
- [API Documentation](../Python/va-disability-calculator/README.md) - Backend API details

---

**Happy Testing!** 🎖️

If you encounter any issues, check the backend API is running on port 5000 first!
