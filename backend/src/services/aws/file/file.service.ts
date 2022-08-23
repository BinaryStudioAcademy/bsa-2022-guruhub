import {
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';

import { FileUploadRequestDto } from '~/common/types/types';
import { FileError } from '~/exceptions/exceptions';

type Constructor = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
};

class File {
  #storage: S3Client;

  public constructor({ accessKeyId, secretAccessKey, region }: Constructor) {
    this.#storage = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }

  public uploadFile({
    file,
    fileName,
    bucket,
  }: FileUploadRequestDto): Promise<PutObjectCommandOutput> {
    try {
      return this.#storage.send(
        new PutObjectCommand({ Bucket: bucket, Key: fileName, Body: file }),
      );
    } catch (err) {
      this.throwError(err);
    }
  }

  private throwError(err: unknown): never {
    if (err instanceof S3ServiceException) {
      throw new FileError({
        message: err.message,
        status: err.$response?.statusCode,
      });
    }
    throw new FileError();
  }
}

export { File };
