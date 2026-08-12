import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { LambdaClient, UpdateFunctionCodeCommand } from '@aws-sdk/client-lambda';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { lookup } from 'mime-types';
import { execSync } from 'child_process';
import 'dotenv/config';

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const BUCKET_NAME = process.env.S3_BUCKET;
const DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const LAMBDA_FUNCTION_NAME = process.env.LAMBDA_FUNCTION_NAME || 'va-disability-calculator-production';
const BUILD_DIR = './dist';
const BACKEND_DIR = '../Python/va-disability-calculator';

const s3Client = new S3Client({ region: AWS_REGION });
const cloudFrontClient = new CloudFrontClient({ region: AWS_REGION });
const lambdaClient = new LambdaClient({ region: AWS_REGION });

// Deploy backend Lambda function
async function deployBackend() {
  try {
    console.log('🔧 Deploying backend to Lambda...');
    
    // Change to backend directory and build
    process.chdir(BACKEND_DIR);
    
    // Install dependencies and build package
    execSync('pip install -r requirements.txt', { stdio: 'inherit' });
    execSync('python build_lambda.py', { stdio: 'inherit' });
    
    // Read the Lambda package
    const zipContent = readFileSync('va-disability-calculator-lambda.zip');
    
    // Update Lambda function code
    await lambdaClient.send(
      new UpdateFunctionCodeCommand({
        FunctionName: LAMBDA_FUNCTION_NAME,
        ZipFile: zipContent,
      })
    );
    
    console.log('✅ Backend deployed to Lambda');
    
    // Return to frontend directory
    process.chdir('../../website/aws-deployment-kit/portfolio');
    
  } catch (error) {
    console.error('❌ Backend deployment failed:', error.message);
    throw error;
  }
}

// Upload files to S3
async function uploadFiles(directory, baseDir = '') {
  const files = readdirSync(directory);

  for (const file of files) {
    const filePath = join(directory, file);
    const s3Key = join(baseDir, file).replace(/\\/g, '/');

    if (statSync(filePath).isDirectory()) {
      await uploadFiles(filePath, s3Key);
    } else {
      const fileContent = readFileSync(filePath);
      const contentType = lookup(filePath) || 'application/octet-stream';

      await s3Client.send(
        new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: s3Key,
          Body: fileContent,
          ContentType: contentType,
        })
      );

      console.log(`✓ Uploaded: ${s3Key}`);
    }
  }
}

// Invalidate CloudFront cache
async function invalidateCache() {
  await cloudFrontClient.send(
    new CreateInvalidationCommand({
      DistributionId: DISTRIBUTION_ID,
      InvalidationBatch: {
        CallerReference: Date.now().toString(),
        Paths: {
          Quantity: 1,
          Items: ['/*'],
        },
      },
    })
  );

  console.log('✓ CloudFront cache invalidated');
}

// Main deployment function
async function deployFullStack() {
  try {
    console.log('🚀 Starting full-stack deployment...\n');

    if (!BUCKET_NAME || !DISTRIBUTION_ID) {
      throw new Error('Missing environment variables. Check .env file.');
    }

    // Step 1: Deploy backend
    await deployBackend();
    console.log('');

    // Step 2: Build frontend
    console.log('📦 Building frontend...');
    execSync('npm run build', { stdio: 'inherit' });
    console.log('');

    // Step 3: Deploy frontend
    console.log('📦 Uploading files to S3...');
    await uploadFiles(BUILD_DIR);

    console.log('\n🔄 Invalidating CloudFront cache...');
    await invalidateCache();

    console.log('\n✅ Full-stack deployment complete!');
    console.log(`🌐 Your site will be available shortly at your CloudFront URL`);
    console.log(`🔧 Backend API: https://${LAMBDA_FUNCTION_NAME}.execute-api.${AWS_REGION}.amazonaws.com/production\n`);
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deployFullStack();
