import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import { CloudFrontClient, CreateInvalidationCommand } from '@aws-sdk/client-cloudfront';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';
import { lookup } from 'mime-types';
import 'dotenv/config';

const AWS_REGION = process.env.AWS_REGION || 'us-east-1';
const BUCKET_NAME = process.env.S3_BUCKET;
const DISTRIBUTION_ID = process.env.CLOUDFRONT_DISTRIBUTION_ID;
const BUILD_DIR = './dist';
const AWS_PROFILE = process.env.AWS_PROFILE || 'build';

// Configure AWS clients with explicit profile
const s3Client = new S3Client({ 
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});
const cloudFrontClient = new CloudFrontClient({ 
  region: AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

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
async function deploy() {
  try {
    console.log('🚀 Starting deployment...\n');

    if (!BUCKET_NAME || !DISTRIBUTION_ID) {
      throw new Error('Missing environment variables. Check .env file.');
    }

    console.log('📦 Uploading files to S3...');
    await uploadFiles(BUILD_DIR);

    console.log('\n🔄 Invalidating CloudFront cache...');
    await invalidateCache();

    console.log('\n✅ Deployment complete!');
    console.log(`🌐 Your site will be available shortly at your CloudFront URL\n`);
  } catch (error) {
    console.error('❌ Deployment failed:', error.message);
    process.exit(1);
  }
}

deploy();
