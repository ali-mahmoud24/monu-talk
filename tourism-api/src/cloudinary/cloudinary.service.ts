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

  async uploadManyFiles(
    files: Express.Multer.File[],
  ): Promise<CloudinaryResponse[]> {
    const uploadPromises: Promise<CloudinaryResponse>[] = [];

    for (const file of files) {
      const uploadPromise = this.uploadFile(file);
      uploadPromises.push(uploadPromise);
    }

    try {
      // Wait for all files to upload concurrently
      const uploadedFiles: CloudinaryResponse[] =
        await Promise.all(uploadPromises);
      return uploadedFiles;
    } catch (error) {
      // Handle errors if any file fails to upload
      console.error('Error uploading files:', error);
      throw error;
    }
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

  async deleteManyFilesByImageUrl(
    imageUrls: string[],
  ): Promise<CloudinaryResponse[]> {
    const deletePromises: Promise<CloudinaryResponse>[] = [];

    for (const url of imageUrls) {
      const deletePromise = this.deleteFileByImageUrl(url);
      deletePromises.push(deletePromise);
    }

    try {
      // Wait for all files to upload concurrently
      const deletedFiles: CloudinaryResponse[] =
        await Promise.all(deletePromises);
      return deletedFiles;
    } catch (error) {
      // Handle errors if any file fails to upload
      console.error('Error deleteing files:', error);
      throw error;
    }
  }

  getPublicId(imageUrl: string) {
    const publicId = extractPublicId(imageUrl);

    return publicId;
  }
}
