# Portfolio Deployment Guide

This guide will walk you through deploying your portfolio to AWS.

## 📋 Prerequisites

1. **AWS Account** - Create one at [aws.amazon.com](https://aws.amazon.com)
2. **AWS CLI** - Installed and configured
3. **Node.js** - Version 18 or higher
4. **Git** - For version control (optional)

## 🚀 Quick Start

### Step 1: Install Dependencies

```bash
cd portfolio
npm install
```

### Step 2: Test Locally

```bash
npm run dev
```

Open http://localhost:3000 to preview your portfolio.

### Step 3: Build for Production

```bash
npm run build
```

This creates optimized files in the `dist/` directory.

## ☁️ AWS Deployment

### Option A: Deploy with CloudFormation (Recommended)

#### 1. Create AWS Infrastructure

```bash
cd ..
aws cloudformation create-stack \
  --stack-name travis-portfolio \
  --template-body file://cloudformation/website-infrastructure-no-domain.yaml \
  --parameters ParameterKey=ProjectName,ParameterValue=travis-portfolio \
  --region us-east-1 \
  --profile build
```

**Wait 10-15 minutes** for the stack to create.

#### 2. Get Deployment Info

```bash
aws cloudformation describe-stacks \
  --stack-name travis-portfolio \
  --region us-east-1 \
  --profile build \
  --query 'Stacks[0].Outputs'
```

**Save these values:**
- `BucketName` - Your S3 bucket
- `DistributionId` - CloudFront distribution ID
- `CloudFrontURL` - Your website URL

#### 3. Deploy Your Portfolio

```bash
cd portfolio
npm run build
cd ..
./scripts/deploy.sh <bucket-name> <distribution-id> build
```

**Example:**
```bash
./scripts/deploy.sh travis-portfolio-123456 E1A2B3C4D5E6F7 build
```

#### 4. Access Your Site

Visit the CloudFront URL from Step 2. Your portfolio is live! 🎉

### Option B: Manual Deployment (Step-by-Step)

For those who prefer manual control over each deployment step.

#### Step 1: Build Portfolio

```powershell
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio
npm run build
```

#### Step 2: Create CloudFormation Stack

```powershell
aws cloudformation create-stack `
    --stack-name travis-portfolio `
    --template-body file://portfolio-infrastructure.yaml `
    --parameters `
        ParameterKey=DomainName,ParameterValue=travisduncansecurity.com `
        ParameterKey=HostedZoneId,ParameterValue=Z07546006238QOGKRJV7 `
    --region us-east-1
```

#### Step 3: Monitor Stack Creation

**Option A: Wait command (blocks until complete)**
```powershell
aws cloudformation wait stack-create-complete `
    --stack-name travis-portfolio `
    --region us-east-1
```

**Option B: Check status manually**
```powershell
aws cloudformation describe-stacks `
    --stack-name travis-portfolio `
    --region us-east-1 `
    --query "Stacks[0].StackStatus"
```

Look for status: `CREATE_COMPLETE`

**Option C: Use AWS Console**  
https://console.aws.amazon.com/cloudformation/home?region=us-east-1

#### Step 4: Get Stack Outputs

```powershell
aws cloudformation describe-stacks `
    --stack-name travis-portfolio `
    --region us-east-1 `
    --query "Stacks[0].Outputs" `
    --output table
```

**Save these values:**
- **BucketName** - Your S3 bucket
- **CloudFrontDistributionId** - Distribution ID
- **WebsiteURL** - Your live URL

#### Step 5: Upload Portfolio Files

Replace `<BUCKET-NAME>` with the BucketName from Step 4:

```powershell
aws s3 sync dist/ s3://<BUCKET-NAME>/ --delete --region us-east-1
```

**Example:**
```powershell
aws s3 sync dist/ s3://travis-portfolio-123456789012/ --delete --region us-east-1
```

#### Step 6: Invalidate CloudFront Cache

Replace `<DISTRIBUTION-ID>` with the CloudFrontDistributionId from Step 4:

```powershell
aws cloudfront create-invalidation `
    --distribution-id <DISTRIBUTION-ID> `
    --paths "/*"
```

**Example:**
```powershell
aws cloudfront create-invalidation `
    --distribution-id E1A2B3C4D5E6F7 `
    --paths "/*"
```

#### Step 7: Verify Deployment

1. **Wait 5-10 minutes** for DNS propagation
2. **Visit:** https://travisduncansecurity.com
3. **Also check:** https://www.travisduncansecurity.com
4. **Verify HTTPS** - Should show secure lock icon

🎉 **Success!** Your portfolio is now live on AWS!

---

### Useful Commands

#### Check Stack Status
```powershell
aws cloudformation describe-stacks `
    --stack-name travis-portfolio `
    --region us-east-1 `
    --query "Stacks[0].{Status:StackStatus,LastUpdated:LastUpdatedTime}"
```

#### View Stack Events (Troubleshooting)
```powershell
aws cloudformation describe-stack-events `
    --stack-name travis-portfolio `
    --region us-east-1 `
    --max-items 20 `
    --output table
```

#### List Stack Resources
```powershell
aws cloudformation list-stack-resources `
    --stack-name travis-portfolio `
    --region us-east-1 `
    --output table
```

#### Delete Stack (If Needed)
```powershell
# Empty S3 buckets first
aws s3 rm s3://<BUCKET-NAME>/ --recursive
aws s3 rm s3://<LOGGING-BUCKET-NAME>/ --recursive

# Delete stack
aws cloudformation delete-stack `
    --stack-name travis-portfolio `
    --region us-east-1
```

## 🔄 Making Updates

When you make changes to your portfolio:

```bash
# 1. Make your changes
# 2. Test locally
npm run dev

# 3. Build
npm run build

# 4. Deploy
../scripts/deploy.sh <bucket-name> <distribution-id> build
```

Your changes will be live in 1-2 minutes!

## 🎨 Customization

### Update Content

Edit these files to customize your portfolio:

- `src/components/Hero.jsx` - Update name, title, bio
- `src/components/About.jsx` - Update about section
- `src/components/Skills.jsx` - Add/remove skills
- `src/components/Projects.jsx` - Add new projects
- `src/components/Certifications.jsx` - Update certifications
- `src/components/Contact.jsx` - Update contact info

### Change Colors

Edit `tailwind.config.js` to change the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Customize these values
        500: '#0ea5e9',
        600: '#0284c7',
      },
    },
  },
}
```

### Add Resume

Place your `resume.pdf` in the `public/` folder.

## 🔒 Security Notes

- Never commit `.env` files with AWS credentials
- Use IAM roles with minimum required permissions
- Enable CloudTrail for audit logging
- Review S3 bucket policies regularly

## 💰 Cost Estimate

**AWS Free Tier (First 12 months):**
- S3: FREE (5 GB storage)
- CloudFront: FREE (1 TB transfer)
- Total: **$0/month**

**After Free Tier:**
- Small portfolio: ~$0.10-0.50/month
- With moderate traffic: ~$1-3/month

## 🆘 Troubleshooting

### Site shows "Access Denied"
- Wait 2-3 minutes after deployment
- Hard refresh browser (Ctrl+Shift+R)
- Check CloudFormation stack is complete

### Changes not showing
- Clear CloudFront cache
- Hard refresh browser
- Wait 1-2 minutes for invalidation

### Build fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### AWS CLI errors
```bash
# Verify AWS credentials
aws sts get-caller-identity --profile build

# Check region is us-east-1
aws configure get region --profile build
```

### Stack Creation Fails
```powershell
# Check events for error details
aws cloudformation describe-stack-events `
    --stack-name travis-portfolio `
    --region us-east-1 `
    --query "StackEvents[?ResourceStatus=='CREATE_FAILED']" `
    --output table
```

### Certificate Validation Pending
- Check Route 53 for CNAME validation records
- Wait up to 30 minutes for DNS propagation
- Certificate must be validated before stack completes

### Website Not Loading
1. Check CloudFront distribution is deployed (can take 15-20 min)
2. Verify DNS propagation: https://dnschecker.org
3. Check CloudFront distribution status in AWS Console
4. Clear browser cache / try incognito mode

### Need More Help?
1. Check CloudFormation events for error details
2. Verify IAM permissions (see **IAM_PERMISSIONS.md**)
3. Check AWS Service Health Dashboard
4. Review CloudWatch logs (if configured)

## 📚 Additional Resources

- [AWS S3 Documentation](https://docs.aws.amazon.com/s3/)
- [CloudFront Documentation](https://docs.aws.amazon.com/cloudfront/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)

## 🎯 Next Steps

1. **Custom Domain** (Optional)
   - Purchase domain from Route 53 or another registrar
   - Use `website-infrastructure.yaml` template
   - Configure SSL certificate

2. **Analytics** (Optional)
   - Add Google Analytics
   - Set up CloudWatch metrics
   - Monitor site performance

3. **Contact Form** (Optional)
   - Set up AWS SES for email
   - Create API Gateway + Lambda
   - Follow `CONTACT_FORM_SETUP.md`

4. **CI/CD** (Optional)
   - Set up GitHub Actions
   - Automate deployments
   - Add automated testing

## ✅ Deployment Checklist

- [ ] Dependencies installed
- [ ] Local build tested
- [ ] CloudFormation stack created
- [ ] Deployment info saved
- [ ] Portfolio deployed
- [ ] Site accessible via CloudFront URL
- [ ] Resume download working
- [ ] All links tested
- [ ] Mobile responsive verified
- [ ] Shared with someone! 🎉

---

**Need help?** Check the main [README.md](../README.md) or [FAQ.md](../FAQ.md) for more information.
