import { GroupsCreateRequestDto } from 'guruhub-shared/common/types/groups/groups';

const DEFAULT_CREATE_GROUP_PAYLOAD: GroupsCreateRequestDto = {
  name: '',
  permissionIds: [],
  userIds: [],
};

export { DEFAULT_CREATE_GROUP_PAYLOAD };
