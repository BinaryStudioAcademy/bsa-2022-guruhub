import {
  CreateBucketCommand,
  CreateBucketCommandOutput,
  DeleteBucketCommand,
  DeleteBucketCommandOutput,
  DeleteObjectCommand,
  DeleteObjectCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';

import {
  StorageManipulateFileRequestDto,
  StorageUploadFileRequestDto,
} from '~/common/types/types';
import { StorageError } from '~/exceptions/exceptions';

type Constructor = {
  region: string;
  credentials: {
    accessKeyId: string;
    secretAccessKey: string;
  };
};

class Storage {
  #storage: S3Client;

  public constructor({ credentials, region }: Constructor) {
    this.#storage = new S3Client({
      region,
      credentials,
    });
  }

  public async createBucket(name: string): Promise<CreateBucketCommandOutput> {
    try {
      return await this.#storage.send(
        new CreateBucketCommand({ Bucket: name }),
      );
    } catch (err) {
      this.throwError(err);
    }
  }

  public async deleteBucket(name: string): Promise<DeleteBucketCommandOutput> {
    try {
      return this.#storage.send(new DeleteBucketCommand({ Bucket: name }));
    } catch (err) {
      this.throwError(err);
    }
  }

  public async uploadFile({
    file,
    fileName,
    space,
  }: StorageUploadFileRequestDto): Promise<PutObjectCommandOutput> {
    try {
      return this.#storage.send(
        new PutObjectCommand({ Bucket: space, Key: fileName, Body: file }),
      );
    } catch (err) {
      this.throwError(err);
    }
  }

  public async downloadFile({
    fileName,
    space,
  }: StorageManipulateFileRequestDto): Promise<GetObjectCommandOutput> {
    try {
      return this.#storage.send(
        new GetObjectCommand({ Bucket: space, Key: fileName }),
      );
    } catch (err) {
      this.throwError(err);
    }
  }

  public async deleteFile({
    fileName,
    space,
  }: StorageManipulateFileRequestDto): Promise<DeleteObjectCommandOutput> {
    try {
      return this.#storage.send(
        new DeleteObjectCommand({ Bucket: space, Key: fileName }),
      );
    } catch (err) {
      this.throwError(err);
    }
  }

  private throwError(err: unknown): never {
    if (err instanceof S3ServiceException) {
      throw new StorageError({
        message: err.message,
        status: err.$response?.statusCode,
      });
    }
    throw new StorageError();
  }
}

export { Storage };
