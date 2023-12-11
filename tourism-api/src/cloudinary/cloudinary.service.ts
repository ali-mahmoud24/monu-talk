import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response';

import { extractPublicId } from 'cloudinary-build-url';

const streamifier = require('streamifier');

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'tourism' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  deleteFileByImageUrl(imageUrl: string): Promise<CloudinaryResponse> {
    const publicId = this.getPublicId(imageUrl);

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.destroy(
        publicId,
        { type: 'upload', resource_type: 'image' },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );
    });
  }

  getPublicId(imageUrl: string) {
    const publicId = extractPublicId(imageUrl);

    return publicId;
  }
}
