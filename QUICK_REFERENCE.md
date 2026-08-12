# ⚡ Quick Reference Guide

## 🚀 Commands Cheat Sheet

```powershell
# First Time Setup
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio
npm install                          # Install dependencies

# Development
npm run dev                          # Start dev server (localhost:3000)
npm run build                        # Build for production
npm run preview                      # Preview production build

# Deployment
npm run build                        # Build first
cd ..
.\scripts\deploy.sh <bucket> <dist-id> build
```

## 📁 File Quick Reference

```
Quick Access Files:
├── START_HERE.md              ← Begin here!
├── SETUP_INSTRUCTIONS.md      ← Detailed setup
├── DEPLOYMENT_GUIDE.md        ← AWS deployment
├── QUICK_REFERENCE.md         ← This file
└── PORTFOLIO_PREVIEW.md       ← Visual preview

Edit Content:
├── src/components/Hero.jsx          ← Landing page
├── src/components/About.jsx         ← About section
├── src/components/Skills.jsx        ← Skills list
├── src/components/Projects.jsx      ← Your projects
├── src/components/Certifications.jsx ← Certifications
├── src/components/Contact.jsx       ← Contact info

Configuration:
├── tailwind.config.js         ← Colors & design
├── vite.config.js             ← Build settings
├── package.json               ← Dependencies

Assets:
└── public/resume.pdf          ← Your resume
```

## 🔗 Important Links

**Your Links:**
- Calendly: https://calendly.com/travisduncan/30min
- LinkedIn: https://www.linkedin.com/in/travis-w-duncan
- GitHub: https://github.com/travdunc
- Email: travis@travisduncansecurity.com
- Domain: travisduncansecurity.com
- Project: https://github.com/travdunc/AWS-CloudFormation-Secure-S3-Bucket/

**Resources:**
- Node.js Download: https://nodejs.org/
- Tailwind CSS Docs: https://tailwindcss.com/docs
- React Docs: https://react.dev/
- Vite Docs: https://vitejs.dev/

## 🎨 Color Codes

```javascript
// Current Color Scheme (Dark Mode)
Background:   #0f172a  (gray-900)
Primary:      #0284c7  (blue-600)
Accent:       #7c3aed  (purple-600)
Text:         #f1f5f9  (gray-100)
Text Muted:   #9ca3af  (gray-400)
Card BG:      #1f2937  (gray-800)
```


### Change Colors
**File:** `tailwind.config.js`
**Lines:** 9-17 (primary colors)

### Update Resume
**Action:** Replace `public/resume.pdf` with new file

## 🐛 Troubleshooting Quick Fixes

**Problem:** npm not found
**Solution:** Install Node.js from nodejs.org, restart terminal

**Problem:** Port 3000 in use
**Solution:** Kill other process or change port in vite.config.js

**Problem:** Build errors
**Solution:** 
```powershell
rm -r node_modules, package-lock.json
npm install
```

**Problem:** Changes not showing
**Solution:** Hard refresh (Ctrl+Shift+R) or restart dev server

**Problem:** Tailwind not working
**Solution:** Check index.css has @tailwind directives

## 📱 Testing Checklist

```
Local Testing (npm run dev):
□ All sections load correctly
□ Navigation smooth scrolling works
□ Calendly button opens new tab
□ Resume downloads successfully
□ LinkedIn/GitHub links work
□ Email link opens mail client
□ Mobile responsive (resize browser)
□ No console errors

Production Build (npm run build):
□ Build completes without errors
□ dist/ folder created
□ All assets included
□ File sizes reasonable (<1MB each)

AWS Deployment:
□ CloudFormation stack created
□ Files uploaded to S3
□ CloudFront invalidation complete
□ Site loads via CloudFront URL
□ HTTPS works
□ All links functional
```

## 🔄 Update Workflow

```
1. Make Changes
   ├── Edit component files
   └── Save changes

2. Test Locally
   ├── npm run dev
   └── Verify in browser

3. Build
   └── npm run build

4. Deploy
   ├── cd ..
   └── .\scripts\deploy.sh <bucket> <dist-id> build

5. Verify
   └── Check CloudFront URL
```

## 💰 AWS Cost Reference

**Free Tier (12 months):**
- S3: FREE (5 GB storage)
- CloudFront: FREE (1 TB transfer)
- Total: $0/month

**After Free Tier:**
- S3: ~$0.10/month
- CloudFront: ~$0.50-2.00/month
- Total: ~$1-3/month

**With Custom Domain:**
- Add Route 53: +$0.50/month
- Add Domain: +$1/month (amortized)

## 🎯 Feature Roadmap Ideas

**Easy Additions:**
- [ ] Add more projects as you complete them
- [ ] Update certifications as you earn them
- [ ] Add testimonials section
- [ ] Include blog posts/articles

**Medium Additions:**
- [ ] Contact form with AWS SES
- [ ] Google Analytics integration
- [ ] Dark/Light mode toggle
- [ ] Project filtering by technology

**Advanced Additions:**
- [ ] Blog section with CMS
- [ ] Admin dashboard
- [ ] A/B testing
- [ ] Multi-language support

## 📞 Quick Contact Info

**Travis Duncan**
- Email: travis@travisduncansecurity.com
- Location: Las Vegas, NV | Remote
- Calendly: https://calendly.com/travisduncan/30min

## ⚙️ Environment Variables

Create `.env` file for deployment:
```env
AWS_REGION=us-east-1
AWS_PROFILE=build
S3_BUCKET=your-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=your-dist-id
```

## 🔐 Security Notes

- ✅ Never commit `.env` files
- ✅ Use IAM roles with minimum permissions
- ✅ Rotate AWS keys every 90 days
- ✅ Enable MFA on AWS account
- ✅ Review S3 bucket policies regularly

## 📊 Performance Tips

**Images:**
- Use WebP format
- Compress before upload
- Lazy load if many images

**Code:**
- Keep dependencies updated
- Remove unused imports
- Use code splitting for large apps

**Deployment:**
- Enable CloudFront compression
- Set proper cache headers
- Use CloudFront edge locations

## ✅ Pre-Deploy Checklist

```
Content Review:
□ Name and title correct
□ Email accurate
□ Social links work
□ Resume is latest version
□ Projects descriptions accurate
□ Skills up to date
□ Certifications current
□ Calendly link correct

Technical Check:
□ npm run build succeeds
□ No console errors
□ All pages load
□ Mobile responsive
□ Links open correctly
□ Resume downloads
□ Images optimized

AWS Setup:
□ AWS account created
□ AWS CLI installed
□ Credentials configured
□ Profile named 'build'
□ Region set to us-east-1
```

## 🎓 Learning Resources

**React:**
- Official Tutorial: https://react.dev/learn
- React Hooks: https://react.dev/reference/react

**Tailwind CSS:**
- Documentation: https://tailwindcss.com/docs
- Cheat Sheet: https://nerdcave.com/tailwind-cheat-sheet

**Vite:**
- Guide: https://vitejs.dev/guide/
- Config Reference: https://vitejs.dev/config/

**AWS:**
- S3 Guide: https://docs.aws.amazon.com/s3/
- CloudFront Guide: https://docs.aws.amazon.com/cloudfront/

## 🆘 Support Resources

**Documentation Files:**
1. START_HERE.md - First steps
2. SETUP_INSTRUCTIONS.md - Detailed setup
3. DEPLOYMENT_GUIDE.md - AWS deployment
4. PROJECT_SUMMARY.md - Complete overview
5. PORTFOLIO_PREVIEW.md - Visual guide
6. QUICK_REFERENCE.md - This file

**Community Help:**
- Stack Overflow: Tag with 'reactjs', 'tailwindcss', 'aws'
- GitHub Issues: For deployment kit issues
- AWS Forums: For AWS-specific questions

---

**Bookmark This Page!** It has everything you need at a glance. 🚀
