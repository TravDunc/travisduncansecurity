# Travis Duncan Portfolio - Infrastructure Update Script
# Use this script to update CloudFormation infrastructure (rare)

Write-Host "☁️ Travis Duncan Portfolio - Infrastructure Update" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️ WARNING: This updates AWS infrastructure, not just content." -ForegroundColor Yellow
Write-Host ""

# Configuration
$StackName = "travis-portfolio"
$DomainName = "travisduncansecurity.com"
$HostedZoneId = "Z07546006238QOGKRJV7"
$Region = "us-east-1"
$TemplateFile = "portfolio-infrastructure.yaml"

# Confirmation prompt
$Confirm = Read-Host "Are you sure you want to update infrastructure? (yes/no)"
if ($Confirm -ne "yes") {
    Write-Host "❌ Update cancelled." -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "📋 Validating CloudFormation template..." -ForegroundColor Yellow
aws cloudformation validate-template `
    --template-body file://$TemplateFile `
    --region $Region `
    --output table

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Template validation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Template is valid!" -ForegroundColor Green
Write-Host ""

# Update stack
Write-Host "☁️ Updating CloudFormation stack..." -ForegroundColor Yellow
Write-Host "This may take 10-20 minutes..." -ForegroundColor Gray
Write-Host ""

aws cloudformation update-stack `
    --stack-name $StackName `
    --template-body file://$TemplateFile `
    --parameters `
        ParameterKey=DomainName,ParameterValue=$DomainName `
        ParameterKey=HostedZoneId,ParameterValue=$HostedZoneId `
    --region $Region `
    --capabilities CAPABILITY_IAM

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Stack update failed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "  - No changes detected: Your template hasn't changed" -ForegroundColor Gray
    Write-Host "  - Stack is updating: Another update is in progress" -ForegroundColor Gray
    Write-Host "  - Validation error: Check template syntax" -ForegroundColor Gray
    exit 1
}

Write-Host "✅ Stack update initiated!" -ForegroundColor Green
Write-Host ""

# Wait for update to complete
Write-Host "⏳ Waiting for stack update to complete..." -ForegroundColor Yellow
aws cloudformation wait stack-update-complete `
    --stack-name $StackName `
    --region $Region

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Stack update failed or timed out!" -ForegroundColor Red
    Write-Host ""
    Write-Host "Check the CloudFormation console for details:" -ForegroundColor Yellow
    Write-Host "https://console.aws.amazon.com/cloudformation/home?region=$Region" -ForegroundColor Cyan
    exit 1
}

Write-Host "✅ Stack updated successfully!" -ForegroundColor Green
Write-Host ""

# Get updated outputs
Write-Host "📋 Getting updated deployment information..." -ForegroundColor Yellow
aws cloudformation describe-stacks `
    --stack-name $StackName `
    --region $Region `
    --query "Stacks[0].Outputs" `
    --output table

Write-Host ""
Write-Host "===================================================" -ForegroundColor Green
Write-Host "🎉 INFRASTRUCTURE UPDATE COMPLETE!" -ForegroundColor Green
Write-Host "===================================================" -ForegroundColor Green
Write-Host ""
Write-Host "💡 Next step: Update your content using:" -ForegroundColor Cyan
Write-Host "  .\update-portfolio.ps1" -ForegroundColor Cyan
Write-Host ""
