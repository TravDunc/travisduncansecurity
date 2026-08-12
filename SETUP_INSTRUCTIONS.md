# Portfolio Setup Instructions

## 🎉 Your Portfolio is Ready!

I've created a modern, professional portfolio website based on your questionnaire. Here's what you need to do next:

## 📦 What Was Created

Your portfolio includes:

✅ **Modern React Application**
- Dark mode design with bold, modern aesthetics
- Smooth animations and transitions
- Fully responsive (mobile, tablet, desktop)
- Professional layout optimized for user experience

✅ **Key Sections**
- Hero section with your name, title, and location
- About section with your professional summary
- Skills organized by category
- Featured projects (1 active + 2 placeholders)
- Certifications showcase
- Contact section with Calendly integration
- Professional footer

✅ **Features**
- "Book a Call" button linking to your Calendly
- Resume download button (resume.pdf included)
- Social media links (LinkedIn, GitHub, Email)
- Smooth scroll navigation
- Modern gradient effects and animations

## 🚀 Next Steps

### Step 1: Install Node.js

You need Node.js to build and run the portfolio.

**Download and Install:**
1. Go to https://nodejs.org/
2. Download the LTS (Long Term Support) version
3. Run the installer
4. Follow the installation wizard (use default settings)
5. Restart your terminal/PowerShell

**Verify Installation:**
```powershell
node --version
npm --version
```

You should see version numbers (e.g., v20.x.x and 10.x.x)

### Step 2: Install Dependencies

Once Node.js is installed:

```powershell
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio
npm install
```

This will install all required packages (~2-3 minutes).

### Step 3: Run Locally

Test your portfolio locally:

```powershell
npm run dev
```

Open your browser to http://localhost:3000

**What to check:**
- ✅ All sections display correctly
- ✅ Navigation works smoothly
- ✅ Calendly button opens in new tab
- ✅ Resume download works
- ✅ Social links work
- ✅ Responsive on mobile (resize browser)

### Step 4: Build for Production

When ready to deploy:

```powershell
npm run build
```

This creates optimized files in the `dist/` folder.

### Step 5: Deploy to AWS

Follow the deployment guide in `DEPLOYMENT_GUIDE.md` or:

```powershell
# From the aws-deployment-kit directory
cd ..

# Create AWS infrastructure (10-15 minutes)
aws cloudformation create-stack `
  --stack-name travis-portfolio `
  --template-body file://cloudformation/website-infrastructure-no-domain.yaml `
  --parameters ParameterKey=ProjectName,ParameterValue=travis-portfolio `
  --region us-east-1 `
  --profile build

# Wait for stack creation, then get outputs
aws cloudformation describe-stacks `
  --stack-name travis-portfolio `
  --region us-east-1 `
  --profile build `
  --query 'Stacks[0].Outputs'

# Deploy your site
cd portfolio
npm run build
cd ..
.\scripts\deploy.sh <bucket-name> <distribution-id> build
```

## 📁 Project Structure

```
portfolio/
├── public/
│   └── resume.pdf              # Your resume (copied from parent dir)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar with Calendly button
│   │   ├── Hero.jsx            # Landing section with CTA
│   │   ├── About.jsx           # Professional summary
│   │   ├── Skills.jsx          # Technical skills by category
│   │   ├── Projects.jsx        # Project showcase
│   │   ├── Certifications.jsx  # Your certifications
│   │   ├── Contact.jsx         # Contact methods + Calendly
│   │   └── Footer.jsx          # Footer with social links
│   ├── App.jsx                 # Main app component
│   ├── main.jsx                # Entry point
│   └── index.css               # Global styles + Tailwind
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tailwind.config.js          # Tailwind configuration
├── vite.config.js              # Build configuration
├── .gitignore                  # Git ignore rules
├── README.md                   # Project documentation
├── DEPLOYMENT_GUIDE.md         # AWS deployment guide
└── SETUP_INSTRUCTIONS.md       # This file
```

## 🎨 Customization Guide

### Update Content

**Personal Info (Hero.jsx):**
- Line 15: Your name
- Line 18: Your title
- Line 22: Location
- Lines 27-29: Your bio

**Skills (Skills.jsx):**
- Lines 8-41: Add/remove/modify skills

**Projects (Projects.jsx):**
- Lines 7-49: Update project details
- Add more projects by duplicating the object structure

**Certifications (Certifications.jsx):**
- Lines 7-48: Your certifications

**Contact Info (Contact.jsx):**
- Lines 8-33: Update email, phone, social links

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: {
    500: '#0ea5e9',  // Main blue - change this
    600: '#0284c7',  // Darker blue - change this
  },
}
```

### Add More Sections

1. Create new component in `src/components/`
2. Import in `App.jsx`
3. Add to navigation in `Navbar.jsx`

## 🔧 Development Commands

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to AWS (after building)
npm run deploy
```

## ✨ Key Features Implemented

Based on your questionnaire:

✅ **Design Preferences:**
- Dark mode (modern tech look)
- Bold & Modern style
- Professional and easy to navigate
- Smooth animations and transitions

✅ **Content:**
- Your name: Travis Duncan
- Title: Senior GRC Engineer | Technical Program Manager
- Location: Las Vegas, NV | Remote
- Email: travis@travisduncansecurity.com
- LinkedIn: travis-w-duncan
- GitHub: travdunc

✅ **Professional Summary:**
- 8+ years experience
- Compliance automation
- Risk management frameworks
- Security accessibility focus

✅ **Skills:**
- Cloud: AWS, Azure
- Security: NIST
- Tools: CloudFormation, Security Hub, GuardDuty, CloudTrail
- Languages: Python, PowerShell
- GRC: NIST RMF
- Core: Risk Assessment, Policy Development, Vulnerability Management

✅ **Certifications:**
- CISSP
- CCSP
- CISM
- CGRC
- NIST CSF Foundation
- Azure SC-900

✅ **Projects:**
- AWS CloudFormation Secure S3 Bucket (active)
- 2 placeholder projects for future additions

✅ **Call to Action:**
- "Book a Call" button in navbar
- "Schedule a Call" button in hero
- Calendly link: https://calendly.com/travisduncan/30min
- Resume download button
- Contact form placeholder for future

## 💡 Pro Tips

1. **Test Locally First**: Always run `npm run dev` before deploying
2. **Mobile Testing**: Resize browser to check mobile view
3. **Update Projects**: Replace placeholder projects as you complete them
4. **Keep Resume Updated**: Replace `public/resume.pdf` with latest version
5. **Version Control**: Initialize git repo to track changes

## 🆘 Troubleshooting

**"npm not recognized"**
- Install Node.js from nodejs.org
- Restart terminal after installation

**"Module not found" errors**
- Run `npm install` in portfolio directory

**Port 3000 already in use**
- Stop other dev servers or change port in `vite.config.js`

**Build fails**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

**Styles not loading**
- Check Tailwind is installed: `npm list tailwindcss`
- Verify `index.css` imports are correct

## 📞 Need Help?

If you encounter any issues:

1. Check error messages carefully
2. Review the troubleshooting section
3. Verify all prerequisites are installed
4. Check that you're in the correct directory

## 🎯 Success Checklist

- [ ] Node.js installed and verified
- [ ] Dependencies installed (`npm install`)
- [ ] Local dev server runs (`npm run dev`)
- [ ] Portfolio displays correctly in browser
- [ ] All links work (Calendly, GitHub, LinkedIn, etc.)
- [ ] Resume downloads successfully
- [ ] Mobile responsive (tested by resizing browser)
- [ ] Content reviewed and accurate
- [ ] Production build works (`npm run build`)
- [ ] Ready to deploy to AWS!

---

**Questions about the portfolio or need changes?** Let me know and I can help customize it further!

**Ready to deploy?** Follow the instructions in `DEPLOYMENT_GUIDE.md`
