import { CourseLectureModuleAssetResponseDto } from './course-lecture-module-asset-response-dto.type';

type CourseLectureModuleResponseDto = {
  id: number;
  title: string;
  description: string;
  sortOrder: number;
  asset: CourseLectureModuleAssetResponseDto;
  courseId: number;
};

export { type CourseLectureModuleResponseDto };
