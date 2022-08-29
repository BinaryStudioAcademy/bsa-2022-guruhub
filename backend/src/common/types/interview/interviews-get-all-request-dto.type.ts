import {
  EntityPaginationRequestQueryDto,
  PermissionsGetAllItemResponseDto,
} from '~/common/types/types';

type InterviewsGetAllRequestDto = {
  userId: number;
  permissions: PermissionsGetAllItemResponseDto[];
} & EntityPaginationRequestQueryDto;

export { type InterviewsGetAllRequestDto };
