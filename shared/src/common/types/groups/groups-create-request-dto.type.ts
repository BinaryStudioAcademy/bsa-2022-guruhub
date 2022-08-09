type GroupsCreateRequestDto = {
  name: string;
  permissionIds: number[];
  userIds?: number[];
};

export { type GroupsCreateRequestDto };
