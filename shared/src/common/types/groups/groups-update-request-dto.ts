type GroupsUpdateRequestDto = {
  name: string;
  permissionIds: number[];
  userIds: number[];
};

type GroupsUpdateRequestParamsDto = {
  id: string;
};

export { type GroupsUpdateRequestDto, type GroupsUpdateRequestParamsDto };
