# 🚀 Integrated AWS Deployment Guide

## 📋 Your Current Infrastructure

Based on your existing setup, you have:
- ✅ **S3 Bucket** for static hosting
- ✅ **CloudFront Distribution** for CDN/HTTPS
- ✅ **Automated deployment** via `deploy-to-aws.js`
- ✅ **Region:** us-east-1
- ✅ **Domain:** travisduncansecurity.com

---

## 🎯 Deployment Strategy

### **Option A: Full-Stack Deployment** ⭐ (Recommended)
Deploy both frontend and backend together in one command:
```bash
npm run deploy-full-stack
```

### **Option B: Separate Deployments**
Deploy backend first, then frontend:
```bash
# Backend (Python directory)
python deploy_serverless.py

# Frontend (Portfolio directory)  
npm run deploy
```

---

## 📦 Step 1: Initial Backend Setup

### 1.1 Deploy Lambda Infrastructure
```bash
cd C:\Code_Scripts\Python\va-disability-calculator
python deploy_serverless.py
```

This creates:
- Lambda function: `va-disability-calculator-production`
- API Gateway with all endpoints
- IAM roles and permissions
- Security configurations

### 1.2 Get API URL
After deployment, note the API URL:
```
https://api-id.execute-api.us-east-1.amazonaws.com/production
```

---

## 📦 Step 2: Configure Frontend

### 2.1 Update Environment Variables
Create `.env` file in portfolio directory:
```bash
# AWS Configuration (existing)
AWS_REGION=us-east-1
AWS_PROFILE=build
S3_BUCKET=your-existing-bucket-name
CLOUDFRONT_DISTRIBUTION_ID=your-existing-distribution-id

# VA Calculator Backend (new)
LAMBDA_FUNCTION_NAME=va-disability-calculator-production
VITE_API_BASE_URL=https://your-api-url.execute-api.us-east-1.amazonaws.com/production
```

### 2.2 Install AWS SDK Dependencies
```bash
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio
npm install
```

---

## 📦 Step 3: Deploy Full Stack

### 3.1 One-Command Full-Stack Deployment
```bash
npm run deploy-full-stack
```

This script:
1. 🔧 Deploys backend to Lambda
2. 📦 Builds frontend with production API URL
3. 📤 Uploads frontend to S3
4. 🔄 Invalidates CloudFront cache

### 3.2 Manual Alternative
```bash
# Deploy backend
cd C:\Code_Scripts\Python\va-disability-calculator
python deploy_serverless.py

# Deploy frontend
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio
npm run deploy
```

---

## 🧪 Step 4: Test Deployment

### 4.1 Test API Endpoints
```bash
# Health check
curl https://your-api-url.execute-api.us-east-1.amazonaws.com/production/health

# Test calculation
curl -X POST https://your-api-url.execute-api.us-east-1.amazonaws.com/production/api/v1/calculate \
  -H "Content-Type: application/json" \
  -d '{"new_rating": 30, "condition_name": "Test"}'
```

### 4.2 Test Full Application
1. Visit `https://travisduncansecurity.com`
2. Navigate to Veterans page
3. Launch calculator
4. Test all functionality:
   - Body diagram interactions
   - Bilateral factor calculations
   - CSV download
   - Mobile responsiveness

---

## 🔄 Update Process

### **Daily Updates**
```bash
# Quick frontend-only update
npm run deploy

# Full-stack update (if backend changed)
npm run deploy-full-stack
```

### **Major Updates**
```bash
# Update backend infrastructure
cd C:\Code_Scripts\Python\va-disability-calculator
python deploy_serverless.py

# Update frontend
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio
npm run deploy-full-stack
```

---

## 📊 Monitoring

### **CloudWatch Logs**
```bash
# Backend logs
aws logs tail /aws/lambda/va-disability-calculator-production --follow

# API Gateway logs
aws logs tail /aws/apigateway/your-api-id --follow
```

### **CloudFront Metrics**
- Check AWS Console → CloudFront → Your Distribution
- Monitor cache hit rates and error rates
- Set up alarms for 4xx/5xx errors

---

## 💰 Cost Analysis

### **Existing Costs** (unchanged)
- S3 storage: ~$0.023/GB/month
- CloudFront: ~$0.09/GB transferred
- Domain: Custom domain costs

### **New Backend Costs**
- Lambda: ~$0.02/month (expected usage)
- API Gateway: ~$0.10/month
- CloudWatch Logs: ~$0.08/month
- **Total additional: ~$0.20/month**

### **Free Tier Coverage**
- Lambda: 1M requests/month free
- API Gateway: 1M calls/month free
- CloudWatch: 5GB logs/month free

---

## 🔧 Configuration Options

### **Custom Domain for API**
```python
# In deploy_serverless.py
cors_origin = 'https://travisduncansecurity.com'
```

### **Performance Tuning**
```yaml
# In cloudformation.yaml
MemorySize: 512  # Increase for better performance
Timeout: 60      # Increase for complex calculations
```

### **Environment-Specific Deployments**
```bash
# Development
python deploy_serverless.py --environment=development

# Production  
python deploy_serverless.py --environment=production
```

---

## 🚨 Troubleshooting

### **Common Issues**

#### Lambda Deployment Fails
```bash
# Check AWS credentials
aws sts get-caller-identity

# Check permissions
aws iam list-attached-user-policies --user-name $(aws sts get-caller-identity --query User.UserName --output text)
```

#### CORS Errors
```bash
# Check CORS configuration
aws cloudformation describe-stacks \
  --stack-name va-disability-calculator-production \
  --query 'Stacks[0].Parameters[?ParameterKey==`CorsOrigin`].ParameterValue'
```

#### API Connection Issues
```bash
# Test API directly
curl -v https://your-api-url.execute-api.us-east-1.amazonaws.com/production/health

# Check Lambda logs
aws logs tail /aws/lambda/va-disability-calculator-production --follow
```

#### Frontend Build Issues
```bash
# Clear cache and rebuild
rm -rf node_modules dist
npm install
npm run build
```

---

## ✅ Deployment Checklist

### **Pre-Deployment**
- [ ] AWS CLI configured with appropriate permissions
- [ ] Backend Lambda infrastructure deployed
- [ ] Environment variables configured in `.env`
- [ ] Frontend builds successfully with new API URL

### **Post-Deployment**
- [ ] API endpoints responding correctly
- [ ] Frontend loads from CloudFront
- [ ] All calculator functionality working
- [ ] Mobile responsive design maintained
- [ ] CORS configured properly
- [ ] Security headers present
- [ ] Rate limiting working

### **Monitoring Setup**
- [ ] CloudWatch log alarms configured
- [ ] CloudFront error monitoring
- [ ] Cost budget alerts set
- [ ] Performance metrics tracked

---

## 🎯 Success Criteria

✅ **Full-stack deployment** working with single command  
✅ **API accessible** at production URL  
✅ **Frontend updated** and serving via CloudFront  
✅ **All calculations** working correctly  
✅ **Security features** active and configured  
✅ **Mobile experience** maintained  
✅ **Cost within** expected budget (~$0.20/month additional)  

---

## 📞 Maintenance

### **Weekly**
- Monitor CloudWatch logs for errors
- Check CloudFront performance metrics
- Review cost usage

### **Monthly**
- Update dependencies if needed
- Review and rotate any secrets
- Performance optimization review

### **Quarterly**
- Full security review
- Architecture optimization assessment
- Cost analysis and optimization

---

**Ready to integrate your VA Calculator with your existing AWS infrastructure!** 🚀

Run `npm run deploy-full-stack` to deploy everything in one command!
