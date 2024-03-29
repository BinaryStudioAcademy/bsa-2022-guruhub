import { UdemyModuleGetResponseDto } from './udemy-module-get-response-dto.type';

type UdemyModulesGetResponseDto = {
  count: number;
  next: string | null;
  results: UdemyModuleGetResponseDto[];
};

export { type UdemyModulesGetResponseDto };
