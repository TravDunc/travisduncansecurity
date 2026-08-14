# 🔐 IAM Permissions for Portfolio Deployment

## Required AWS IAM Permissions

This document outlines the permissions needed for an IAM user to deploy your portfolio website to AWS.

---

## 🎯 Minimum Required Permissions

### For Initial Infrastructure Deployment

The IAM user needs permissions to:
1. Create and manage CloudFormation stacks
2. Create and configure S3 buckets
3. Create and manage CloudFront distributions
4. Create IAM policies (for S3 bucket policies)
5. (Optional) Create Route 53 hosted zones and records

---

## 📋 Recommended IAM Policy

### Option 1: Managed Policies (Easiest)

Attach these AWS managed policies to your IAM user:

```json
{
  "ManagedPolicies": [
    "arn:aws:iam::aws:policy/AWSCloudFormationFullAccess",
    "arn:aws:iam::aws:policy/AmazonS3FullAccess",
    "arn:aws:iam::aws:policy/CloudFrontFullAccess"
  ]
}
```

**Pros:**
- ✅ Quick to set up
- ✅ AWS maintains them
- ✅ Covers all deployment scenarios

**Cons:**
- ❌ More permissions than strictly necessary
- ❌ Less granular control

---

### Option 2: Custom Least-Privilege Policy (Most Secure)

Create a custom policy with only the permissions needed:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudFormationPermissions",
      "Effect": "Allow",
      "Action": [
        "cloudformation:CreateStack",
        "cloudformation:UpdateStack",
        "cloudformation:DeleteStack",
        "cloudformation:DescribeStacks",
        "cloudformation:DescribeStackEvents",
        "cloudformation:DescribeStackResources",
        "cloudformation:GetTemplate",
        "cloudformation:ListStacks",
        "cloudformation:ValidateTemplate"
      ],
      "Resource": "*"
    },
    {
      "Sid": "S3BucketPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:CreateBucket",
        "s3:DeleteBucket",
        "s3:ListBucket",
        "s3:GetBucketLocation",
        "s3:GetBucketPolicy",
        "s3:PutBucketPolicy",
        "s3:DeleteBucketPolicy",
        "s3:GetBucketWebsite",
        "s3:PutBucketWebsite",
        "s3:GetBucketVersioning",
        "s3:PutBucketVersioning",
        "s3:GetBucketAcl",
        "s3:PutBucketAcl",
        "s3:GetBucketPublicAccessBlock",
        "s3:PutBucketPublicAccessBlock",
        "s3:GetEncryptionConfiguration",
        "s3:PutEncryptionConfiguration",
        "s3:GetBucketCORS",
        "s3:PutBucketCORS"
      ],
      "Resource": "arn:aws:s3:::*portfolio*"
    },
    {
      "Sid": "S3ObjectPermissions",
      "Effect": "Allow",
      "Action": [
        "s3:PutObject",
        "s3:GetObject",
        "s3:DeleteObject",
        "s3:ListBucket",
        "s3:PutObjectAcl",
        "s3:GetObjectAcl"
      ],
      "Resource": "arn:aws:s3:::*portfolio*/*"
    },
    {
      "Sid": "CloudFrontPermissions",
      "Effect": "Allow",
      "Action": [
        "cloudfront:CreateDistribution",
        "cloudfront:GetDistribution",
        "cloudfront:GetDistributionConfig",
        "cloudfront:UpdateDistribution",
        "cloudfront:DeleteDistribution",
        "cloudfront:ListDistributions",
        "cloudfront:CreateInvalidation",
        "cloudfront:GetInvalidation",
        "cloudfront:ListInvalidations",
        "cloudfront:CreateOriginAccessControl",
        "cloudfront:GetOriginAccessControl",
        "cloudfront:DeleteOriginAccessControl",
        "cloudfront:ListOriginAccessControls"
      ],
      "Resource": "*"
    },
    {
      "Sid": "IAMPermissionsForBucketPolicy",
      "Effect": "Allow",
      "Action": [
        "iam:CreateServiceLinkedRole"
      ],
      "Resource": "arn:aws:iam::*:role/aws-service-role/cloudfront.amazonaws.com/*",
      "Condition": {
        "StringLike": {
          "iam:AWSServiceName": "cloudfront.amazonaws.com"
        }
      }
    }
  ]
}
```

**Pros:**
- ✅ Minimum necessary permissions
- ✅ Better security posture
- ✅ Limits blast radius if compromised

**Cons:**
- ❌ Takes longer to set up
- ❌ May need adjustments for edge cases

---

### Option 3: With Custom Domain Support (Route 53)

If deploying with a custom domain, add these permissions:

```json
{
  "Sid": "Route53Permissions",
  "Effect": "Allow",
  "Action": [
    "route53:CreateHostedZone",
    "route53:GetHostedZone",
    "route53:DeleteHostedZone",
    "route53:ListHostedZones",
    "route53:ChangeResourceRecordSets",
    "route53:GetChange",
    "route53:ListResourceRecordSets"
  ],
  "Resource": "*"
},
{
  "Sid": "ACMPermissions",
  "Effect": "Allow",
  "Action": [
    "acm:RequestCertificate",
    "acm:DescribeCertificate",
    "acm:DeleteCertificate",
    "acm:ListCertificates",
    "acm:AddTagsToCertificate"
  ],
  "Resource": "*"
}
```

---

## 🛠 Setup Instructions

### Step 1: Create IAM User

```bash
# Create IAM user
aws iam create-user --user-name portfolio-deployer

# Create access keys
aws iam create-access-key --user-name portfolio-deployer
```

Save the `AccessKeyId` and `SecretAccessKey` - you'll need these!

### Step 2: Attach Policy

**For Managed Policies:**
```bash
# Attach CloudFormation access
aws iam attach-user-policy \
  --user-name portfolio-deployer \
  --policy-arn arn:aws:iam::aws:policy/AWSCloudFormationFullAccess

# Attach S3 access
aws iam attach-user-policy \
  --user-name portfolio-deployer \
  --policy-arn arn:aws:iam::aws:policy/AmazonS3FullAccess

# Attach CloudFront access
aws iam attach-user-policy \
  --user-name portfolio-deployer \
  --policy-arn arn:aws:iam::aws:policy/CloudFrontFullAccess
```

**For Custom Policy:**
```bash
# Save custom policy to file: portfolio-deploy-policy.json
# Then create and attach:

aws iam create-policy \
  --policy-name PortfolioDeploymentPolicy \
  --policy-document file://portfolio-deploy-policy.json

aws iam attach-user-policy \
  --user-name portfolio-deployer \
  --policy-arn arn:aws:iam::YOUR_ACCOUNT_ID:policy/PortfolioDeploymentPolicy
```

### Step 3: Configure AWS CLI

```bash
aws configure --profile build
# Enter Access Key ID: [paste from Step 1]
# Enter Secret Access Key: [paste from Step 1]
# Default region: us-east-1
# Default output format: json
```

### Step 4: Test Permissions

```bash
# Test CloudFormation access
aws cloudformation list-stacks --profile build

# Test S3 access
aws s3 ls --profile build

# Test CloudFront access
aws cloudfront list-distributions --profile build
```

If these commands work, you're ready to deploy!

---

## 🔒 Security Best Practices

### 1. Use MFA (Multi-Factor Authentication)

Enable MFA on the IAM user:
```bash
aws iam enable-mfa-device \
  --user-name portfolio-deployer \
  --serial-number arn:aws:iam::ACCOUNT_ID:mfa/portfolio-deployer \
  --authentication-code1 123456 \
  --authentication-code2 789012
```

### 2. Rotate Access Keys Regularly

```bash
# Create new key
aws iam create-access-key --user-name portfolio-deployer

# Update AWS CLI configuration with new key
aws configure --profile build

# Delete old key
aws iam delete-access-key \
  --user-name portfolio-deployer \
  --access-key-id OLD_ACCESS_KEY_ID
```

**Recommendation:** Rotate every 90 days

### 3. Use IAM Roles (Advanced)

For production environments, consider using IAM roles with temporary credentials instead of long-lived access keys.

### 4. Enable CloudTrail

Monitor all API calls:
```bash
aws cloudtrail create-trail \
  --name portfolio-deployment-trail \
  --s3-bucket-name my-cloudtrail-bucket
```

### 5. Set Up Billing Alerts

Prevent surprise charges:
```bash
aws cloudwatch put-metric-alarm \
  --alarm-name portfolio-billing-alert \
  --alarm-description "Alert when billing exceeds $10" \
  --metric-name EstimatedCharges \
  --namespace AWS/Billing \
  --statistic Maximum \
  --period 21600 \
  --threshold 10 \
  --comparison-operator GreaterThanThreshold
```

---

## 🚨 Troubleshooting

### "Access Denied" Errors

**Problem:** `User: arn:aws:iam::xxx:user/portfolio-deployer is not authorized to perform: cloudformation:CreateStack`

**Solutions:**
1. Verify policies are attached:
   ```bash
   aws iam list-attached-user-policies --user-name portfolio-deployer
   ```

2. Check policy permissions match requirements

3. Ensure you're using the correct profile:
   ```bash
   aws configure list --profile build
   ```

4. Wait 5-10 seconds after attaching policies (propagation delay)

### Invalid Credentials

**Problem:** `The security token included in the request is invalid`

**Solutions:**
1. Verify access keys are correct:
   ```bash
   aws configure get aws_access_key_id --profile build
   ```

2. Regenerate access keys if needed

3. Check for typos in credentials

### Region Issues

**Problem:** Resources not found or access denied in specific regions

**Solution:** Ensure you're using `us-east-1` for CloudFormation and CloudFront:
```bash
aws configure set region us-east-1 --profile build
```

---

## 📊 Permission Levels Comparison

| Permission Level | Setup Time | Security | Maintenance | Recommended For |
|-----------------|------------|----------|-------------|-----------------|
| **Managed Policies** | 5 min | Medium | Low | Quick start, learning |
| **Custom Least-Privilege** | 15 min | High | Medium | Production use |
| **With Route 53** | 20 min | High | Medium | Custom domains |

---

## 📝 Complete Setup Checklist

- [ ] IAM user created
- [ ] Appropriate policies attached (managed or custom)
- [ ] Access keys generated and saved securely
- [ ] AWS CLI configured with profile
- [ ] Profile set to `us-east-1` region
- [ ] Permissions tested successfully
- [ ] (Recommended) MFA enabled
- [ ] (Recommended) Billing alerts configured
- [ ] (Recommended) CloudTrail enabled
- [ ] Access keys stored securely (not in code!)

---

## 💡 Additional Tips

1. **Use AWS Organizations** - For multiple accounts/environments
2. **Tag Resources** - Add tags to track costs: `Project=Portfolio`
3. **Enable Cost Explorer** - Monitor spending patterns
4. **Use AWS Budgets** - Set spending limits
5. **Review IAM Access Analyzer** - Identify unused permissions

---

## 🆘 Need Help?

**Common Resources:**
- AWS IAM Documentation: https://docs.aws.amazon.com/iam/
- IAM Policy Simulator: https://policysim.aws.amazon.com/
- AWS Security Best Practices: https://aws.amazon.com/security/best-practices/

**Check Current Permissions:**
```bash
aws iam get-user-policy \
  --user-name portfolio-deployer \
  --policy-name YourPolicyName
```

---

## ✅ You're Ready When...

- [ ] IAM user created and configured
- [ ] AWS CLI profile working
- [ ] Test commands execute successfully
- [ ] Permissions documented and understood
- [ ] Security best practices followed

**Next Step:** Follow DEPLOYMENT_GUIDE.md to deploy your portfolio!
