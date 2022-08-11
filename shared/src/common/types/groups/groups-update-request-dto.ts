type GroupsUpdateRequestDto = {
  id: number;
  name?: string;
  permissionIds?: number[];
  userIds?: number[];
};

export { type GroupsUpdateRequestDto };
