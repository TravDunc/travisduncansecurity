# 🚀 Serverless AWS Deployment Guide

## 📋 Overview

Deploy your VA Disability Calculator using AWS Lambda + API Gateway for a modern, serverless architecture that's cost-effective and auto-scaling.

---

## 🏗️ Architecture

```
Frontend: S3 + CloudFront (existing)
Backend: Lambda + API Gateway (new)
Cost: ~$0.20/month (free tier)
Scaling: Automatic (0 to millions of requests)
```

---

## 🎯 Prerequisites

### AWS Requirements
- ✅ AWS Account with IAM permissions
- ✅ Can create Lambda functions and API Gateway
- ✅ Python 3.9+ and boto3 installed
- ✅ AWS CLI configured (`aws configure`)

### Domain Information
- ✅ Frontend domain: `travisduncansecurity.com`
- ✅ Will create API at: `https://api-id.execute-api.us-east-1.amazonaws.com/production`

---

## 📦 Step 1: Prepare Backend for Lambda

### 1.1 Navigate to Backend Directory
```bash
cd C:\Code_Scripts\Python\va-disability-calculator
```

### 1.2 Install AWS Dependencies
```bash
pip install boto3
```

### 1.3 Update Requirements for Lambda
```bash
# Add to requirements.txt
boto3>=1.28.0
```

### 1.4 Test Lambda Handler Locally
```bash
python -c "from lambda_handler import lambda_handler; print('Lambda handler imports successfully')"
```

---

## 🏗️ Step 2: Deploy Infrastructure

### 2.1 Run Automated Deployment
```bash
python deploy_serverless.py
```

### 2.2 Manual Deployment (Alternative)
```bash
# Build Lambda package
python build_lambda.py

# Deploy CloudFormation stack
aws cloudformation deploy \
  --template-file cloudformation.yaml \
  --stack-name va-disability-calculator-production \
  --parameter-overrides Environment=production CorsOrigin=https://travisduncansecurity.com \
  --capabilities CAPABILITY_IAM

# Get API URL
aws cloudformation describe-stacks \
  --stack-name va-disability-calculator-production \
  --query 'Stacks[0].Outputs[?OutputKey==`ApiUrl`].OutputValue' \
  --output text
```

---

## 🔧 Step 3: Update Frontend Configuration

### 3.1 Set Production API URL
```bash
cd C:\Code_Scripts\website\aws-deployment-kit\portfolio

# Create production environment file
echo "VITE_API_BASE_URL=https://your-api-url.execute-api.us-east-1.amazonaws.com/production" > .env.production
```

### 3.2 Build and Deploy Frontend
```bash
npm run build
# Deploy to your existing S3 + CloudFront setup
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
1. Visit your portfolio website
2. Navigate to Veterans page
3. Launch calculator
4. Add conditions and test calculations
5. Verify bilateral factor works
6. Test CSV download

---

## 📊 Monitoring and Logging

### CloudWatch Logs
```bash
# View Lambda logs
aws logs tail /aws/lambda/va-disability-calculator-production --follow

# View API Gateway logs
aws logs tail /aws/apigateway/your-api-id --follow
```

### Monitoring Metrics
- Lambda invocations and errors
- API Gateway request counts and latency
- CloudWatch custom metrics (if added)

---

## 🔒 Security Configuration

### CORS Settings
```yaml
# In cloudformation.yaml
CorsOrigin: 'https://travisduncansecurity.com'
```

### Environment Variables
```bash
FLASK_ENV=production
CORS_ORIGINS=https://travisduncansecurity.com
DEBUG_MODE=false
```

### IAM Permissions
- Lambda execution role with CloudWatch logs
- API Gateway integration permissions
- No additional permissions needed

---

## 💰 Cost Breakdown

### Free Tier (First 12 Months)
- Lambda: 1M requests/month free
- API Gateway: 1M API calls/month free
- CloudWatch Logs: 5GB ingest/month free
- **Total Cost: $0.00/month**

### After Free Tier
- Lambda: ~$0.02/month (based on expected usage)
- API Gateway: ~$0.10/month
- CloudWatch Logs: ~$0.08/month
- **Total Cost: ~$0.20/month**

---

## 🔄 Updates and Maintenance

### Update Lambda Code
```bash
# Make code changes
python build_lambda.py
python deploy_serverless.py
```

### Update Infrastructure
```bash
# Modify cloudformation.yaml
aws cloudformation deploy \
  --template-file cloudformation.yaml \
  --stack-name va-disability-calculator-production \
  --parameter-overrides Environment=production CorsOrigin=https://travisduncansecurity.com \
  --capabilities CAPABILITY_IAM
```

### Rollback Deployment
```bash
# Delete stack (emergency rollback)
aws cloudformation delete-stack --stack-name va-disability-calculator-production
```

---

## 🚨 Troubleshooting

### Common Issues

#### Lambda Timeout
```yaml
# In cloudformation.yaml - increase timeout
Timeout: 60  # Increase from 30
MemorySize: 512  # Increase from 256
```

#### CORS Errors
```bash
# Check CORS origin setting
aws cloudformation describe-stacks \
  --stack-name va-disability-calculator-production \
  --query 'Stacks[0].Parameters'
```

#### API Gateway 502 Errors
```bash
# Check Lambda logs for errors
aws logs tail /aws/lambda/va-disability-calculator-production --follow
```

#### Package Size Too Large
```bash
# Check package size
ls -lh va-disability-calculator-lambda.zip
# Should be < 50MB for Lambda
```

### Debug Commands
```bash
# Test Lambda directly
aws lambda invoke \
  --function-name va-disability-calculator-production \
  --payload '{"httpMethod":"GET","path":"/health"}' \
  response.json

# Check CloudFormation stack status
aws cloudformation describe-stacks \
  --stack-name va-disability-calculator-production
```

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] AWS CLI configured with appropriate permissions
- [ ] Backend code tested locally
- [ ] Frontend builds successfully
- [ ] Domain name confirmed

### Post-Deployment
- [ ] API endpoints responding correctly
- [ ] Frontend connects to new API
- [ ] CORS configured properly
- [ ] Security headers present
- [ ] Rate limiting working
- [ ] Mobile functionality tested
- [ ] Error handling verified

### Monitoring Setup
- [ ] CloudWatch alarms configured
- [ ] Log retention policies set
- [ ] Cost monitoring enabled
- [ ] Performance metrics tracked

---

## 🎯 Success Criteria

✅ **API deployed** and accessible at production URL  
✅ **Frontend updated** to use new API endpoint  
✅ **All calculations** working correctly  
✅ **Security features** (rate limiting, CORS) active  
✅ **Mobile responsive** design maintained  
✅ **Error handling** working properly  
✅ **Cost within** free tier expectations  

---

## 📞 Support and Maintenance

### Daily
- Monitor CloudWatch logs for errors
- Check API performance metrics

### Weekly
- Review cost usage
- Check for security updates

### Monthly
- Update dependencies
- Review and rotate any secrets (if added)

---

**Ready to deploy!** 🚀

Run `python deploy_serverless.py` in your backend directory to start the deployment process.
