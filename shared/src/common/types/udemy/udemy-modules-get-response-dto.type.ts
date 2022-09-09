import { UdemyModuleGetResponseDto } from './udemy-module-get-response-dto.type';

type UdemyModulesGetResponseDto = {
  count: number;
  results: UdemyModuleGetResponseDto[];
};

export { type UdemyModulesGetResponseDto };
