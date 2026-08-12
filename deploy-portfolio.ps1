# Travis Duncan Portfolio - AWS Deployment Script
# This script deploys your portfolio to AWS using CloudFormation

Write-Host "🚀 Travis Duncan Portfolio - AWS Deployment" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$StackName = "travis-portfolio"
$DomainName = "travisduncansecurity.com"
$HostedZoneId = "Z07546006238QOGKRJV7"
$Region = "us-east-1"
$TemplateFile = "portfolio-infrastructure.yaml"

# Step 1: Build the portfolio
Write-Host "📦 Step 1: Building portfolio..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}
Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""

# Step 2: Deploy CloudFormation stack
Write-Host "☁️ Step 2: Deploying CloudFormation stack..." -ForegroundColor Yellow
Write-Host "This will take approximately 15-20 minutes..." -ForegroundColor Gray
Write-Host ""

aws cloudformation create-stack `
    --stack-name $StackName `
    --template-body file://$TemplateFile `
    --parameters `
        ParameterKey=DomainName,ParameterValue=$DomainName `
        ParameterKey=HostedZoneId,ParameterValue=$HostedZoneId `
    --region $Region `
    --capabilities CAPABILITY_IAM

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Stack creation failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - Stack already exists: Delete it first or use 'update-stack'" -ForegroundColor Gray
    Write-Host "  - Insufficient permissions: Check IAM permissions" -ForegroundColor Gray
    Write-Host "  - Certificate validation: May need to approve DNS validation" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Stack creation initiated!" -ForegroundColor Green
Write-Host ""

# Step 3: Wait for stack to complete
Write-Host "⏳ Step 3: Waiting for stack creation..." -ForegroundColor Yellow
Write-Host "Monitoring stack status (this may take 15-20 minutes)..." -ForegroundColor Gray
Write-Host ""

aws cloudformation wait stack-create-complete `
    --stack-name $StackName `
    --region $Region

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Stack creation failed or timed out!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check the CloudFormation console for details:" -ForegroundColor Yellow
    Write-Host "https://console.aws.amazon.com/cloudformation/home?region=$Region" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Stack created successfully!" -ForegroundColor Green
Write-Host ""

# Step 4: Get stack outputs
Write-Host "📋 Step 4: Getting deployment information..." -ForegroundColor Yellow
$Outputs = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs" `
    --output json | ConvertFrom-Json

$BucketName = ($Outputs | Where-Object {$_.OutputKey -eq "BucketName"}).OutputValue
$DistributionId = ($Outputs | Where-Object {$_.OutputKey -eq "CloudFrontDistributionId"}).OutputValue
$WebsiteURL = ($Outputs | Where-Object {$_.OutputKey -eq "WebsiteURL"}).OutputValue

Write-Host "✅ Deployment information retrieved!" -ForegroundColor Green
Write-Host ""
Write-Host "  📦 S3 Bucket: $BucketName" -ForegroundColor Cyan
Write-Host "  🌐 CloudFront Distribution: $DistributionId" -ForegroundColor Cyan
Write-Host "  🔗 Website URL: $WebsiteURL" -ForegroundColor Cyan
Write-Host ""

# Step 5: Upload portfolio files to S3
Write-Host "📤 Step 5: Uploading portfolio to S3..." -ForegroundColor Yellow
aws s3 sync dist/ s3://$BucketName/ --delete --region $Region

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Files uploaded successfully!" -ForegroundColor Green
Write-Host ""

# Step 6: Invalidate CloudFront cache
Write-Host "🔄 Step 6: Invalidating CloudFront cache..." -ForegroundColor Yellow
$InvalidationId = aws cloudfront create-invalidation `
    --distribution-id $DistributionId `
    --paths "/*" `
    --query "Invalidation.Id" `
    --output text

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Cache invalidation failed (non-critical)" -ForegroundColor Yellow
} else {
    Write-Host "✅ Cache invalidation initiated! ID: $InvalidationId" -ForegroundColor Green
}
Write-Host ""

# Success!
Write-Host "=============================================" -ForegroundColor Green
Write-Host "🎉 DEPLOYMENT COMPLETE!" -ForegroundColor Green
Write-Host "=============================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your portfolio is now live at:" -ForegroundColor Cyan
Write-Host "  🔗 $WebsiteURL" -ForegroundColor Cyan
Write-Host "  🔗 https://www.$DomainName" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏰ Note: SSL certificate and DNS propagation may take 5-10 minutes." -ForegroundColor Yellow
Write-Host ""
Write-Host "📊 CloudFormation Stack: $StackName" -ForegroundColor Gray
Write-Host "🌎 Region: $Region" -ForegroundColor Gray
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Wait 5-10 minutes for DNS propagation" -ForegroundColor Gray
Write-Host "  2. Visit $WebsiteURL to test" -ForegroundColor Gray
Write-Host "  3. Share your portfolio! 🚀" -ForegroundColor Gray
Write-Host ""
