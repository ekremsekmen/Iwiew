// src/services/awsS3Service.ts
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

dotenv.config();

// AWS S3 yapılandırması
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
  },
});

export const uploadVideoToS3 = async (filePath: string, candidateId: string): Promise<string> => {
  const fileStream = fs.createReadStream(filePath);
  const fileExtension = path.extname(filePath).toLowerCase();

  let contentType = 'video/mp4';  // Varsayılan content type
  if (fileExtension === '.mov') {
    contentType = 'video/quicktime';
  } else if (fileExtension === '.webm') {
    contentType = 'video/webm';
  }

  // UUID'yi bir kez oluştur ve hem S3 key hem de URL için kullan
  const videoKey = `videos/${candidateId}/${uuidv4()}${fileExtension}`;

  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET_NAME || '',
    Key: videoKey,
    Body: fileStream,
    ContentType: contentType,
  };

  if (!uploadParams.Bucket) {
    throw new Error('AWS S3 bucket is not defined in environment variables');
  }

  const command = new PutObjectCommand(uploadParams);
  await s3Client.send(command);
  
  // Aynı videoKey ile URL'yi döndür
  return `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${videoKey}`;
};
