import { HttpException, Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiResponse,
} from 'cloudinary';
import * as streamifier from 'streamifier';
import sharp from 'sharp';
@Injectable()
export class UploadService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadImage(
    file: Express.Multer.File,
  ): Promise<UploadApiResponse | UploadApiErrorResponse> {
    try {
      // Optimize image before uploading: resize to max 1920px width and convert to WebP
      const optimizedBuffer = await sharp(file.buffer)
        .resize({ width: 1920, withoutEnlargement: true })
        .webp({ quality: 80 })
        .toBuffer();

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'booking-app' },
          (error, result) => {
            if (error) return reject(error);
            if (!result)
              return reject(new Error('Upload failed, no result returned'));
            resolve(result);
          },
        );
        streamifier.createReadStream(optimizedBuffer).pipe(uploadStream);
      });
    } catch (error) {
      throw new HttpException(`Image optimization failed: ${error.message}`, 500);
    }
  }

  async deleteImage(publicId: string): Promise<{ message: string }> {
    try {
      await cloudinary.uploader.destroy(publicId);
      return { message: `Image ${publicId} deleted successfully` };
    } catch (error) {
      throw new HttpException(`Failed to delete image: ${error.message}`, 500);
    }
  }
}
