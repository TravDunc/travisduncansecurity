# Travis Duncan Portfolio - Content Update Script
# Use this script to update your portfolio content after making changes

Write-Host "🔄 Travis Duncan Portfolio - Content Update" -ForegroundColor Cyan
Write-Host "===========================================" -ForegroundColor Cyan
Write-Host ""

# Configuration
$StackName = "travis-portfolio"
$Region = "us-east-1"

# Step 1: Get current deployment info
Write-Host "📋 Step 1: Getting deployment information..." -ForegroundColor Yellow

$Outputs = aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs" `
    --output json 2>$null | ConvertFrom-Json

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error: Stack '$StackName' not found!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Make sure you've deployed the portfolio first using:" -ForegroundColor Yellow
    Write-Host "  .\deploy-portfolio.ps1" -ForegroundColor Cyan
    exit 1
}

$BucketName = ($Outputs | Where-Object {$_.OutputKey -eq "BucketName"}).OutputValue
$DistributionId = ($Outputs | Where-Object {$_.OutputKey -eq "CloudFrontDistributionId"}).OutputValue
$WebsiteURL = ($Outputs | Where-Object {$_.OutputKey -eq "WebsiteURL"}).OutputValue

Write-Host "✅ Found deployment!" -ForegroundColor Green
Write-Host "  📦 S3 Bucket: $BucketName" -ForegroundColor Gray
Write-Host "  🌐 Distribution: $DistributionId" -ForegroundColor Gray
Write-Host "  🔗 Website: $WebsiteURL" -ForegroundColor Gray
Write-Host ""

# Step 2: Build the portfolio
Write-Host "📦 Step 2: Building updated portfolio..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed! Please fix errors and try again." -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build complete!" -ForegroundColor Green
Write-Host ""

# Step 3: Upload to S3
Write-Host "📤 Step 3: Uploading files to S3..." -ForegroundColor Yellow
aws s3 sync dist/ s3://$BucketName/ --delete --region $Region

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Upload failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Files uploaded successfully!" -ForegroundColor Green
Write-Host ""

# Step 4: Invalidate CloudFront cache
Write-Host "🔄 Step 4: Invalidating CloudFront cache..." -ForegroundColor Yellow
$InvalidationId = aws cloudfront create-invalidation `
    --distribution-id $DistributionId `
    --paths "/*" `
    --query "Invalidation.Id" `
    --output text

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ Cache invalidation failed (non-critical)" -ForegroundColor Yellow
    Write-Host "Your changes are uploaded but may take 24 hours to appear." -ForegroundColor Yellow
} else {
    Write-Host "✅ Cache invalidation initiated! ID: $InvalidationId" -ForegroundColor Green
    Write-Host "Changes will be visible in 1-5 minutes." -ForegroundColor Gray
}
Write-Host ""

# Success!
Write-Host "===========================================" -ForegroundColor Green
Write-Host "🎉 UPDATE COMPLETE!" -ForegroundColor Green
Write-Host "===========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your updated portfolio will be live shortly at:" -ForegroundColor Cyan
Write-Host "  🔗 $WebsiteURL" -ForegroundColor Cyan
Write-Host ""
Write-Host "⏰ Note: Changes may take 1-5 minutes to appear due to CDN caching." -ForegroundColor Yellow
Write-Host ""
Write-Host "💡 Tip: Hard refresh your browser (Ctrl+Shift+R) to see changes immediately." -ForegroundColor Gray
Write-Host ""
