import { UdemyLectureAssetGetResponseDto } from './udemy-lecture-asset-get-response-dto.type';

type UdemyLectureGetResponseDto = {
  title: string;
  description: string;
  asset: UdemyLectureAssetGetResponseDto;
  sortOrder: number;
};

export { type UdemyLectureGetResponseDto };
