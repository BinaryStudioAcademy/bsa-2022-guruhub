import {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} from '@aws-sdk/client-s3';

import {
  FileGetResponseDto,
  FileGetUrlRequestDto,
  FileUploadRequestDto,
} from '~/common/types/types';
import { file as fileRep } from '~/data/repositories/repositories';
import { FilesError } from '~/exceptions/exceptions';

type Constructor = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  fileRepository: typeof fileRep;
};

class File {
  #storage: S3Client;

  #fileRepository: typeof fileRep;

  public constructor({
    accessKeyId,
    secretAccessKey,
    region,
    fileRepository,
  }: Constructor) {
    this.#storage = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    this.#fileRepository = fileRepository;
  }

  public async uploadFile({
    file,
    fileName,
    bucket,
    contentType,
  }: FileUploadRequestDto): Promise<FileGetResponseDto> {
    try {
      await this.#storage.send(
        new PutObjectCommand({ Bucket: bucket, Key: fileName, Body: file }),
      );

      const fileUrl = this.getFileUrl({ bucket, fileName });

      return this.#fileRepository.create({
        contentType,
        url: fileUrl,
      });
    } catch (err) {
      this.throwError(err);
    }
  }

  private getFileUrl({ bucket, fileName }: FileGetUrlRequestDto): string {
    return `https://${bucket}.s3.amazonaws.com/${fileName}`;
  }

  private throwError(err: unknown): never {
    if (err instanceof S3ServiceException) {
      throw new FilesError({
        message: err.message,
        status: err.$response?.statusCode,
      });
    }
    throw new FilesError();
  }
}

export { File };
