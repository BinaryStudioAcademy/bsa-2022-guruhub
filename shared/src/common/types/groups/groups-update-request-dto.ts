type GroupsUpdateRequestDto = {
  name: string;
  permissionIds: number[];
  userIds: number[];
};

type GroupsUpdateRequestParamsDto = {
  id: number;
};

export { type GroupsUpdateRequestDto, type GroupsUpdateRequestParamsDto };
