type UsersToGroupsResponseDto = {
  id: number;
  userId: number;
  groupId: number;
};

type UsersToGroupsGetAllResponseDto = {
  items: UsersToGroupsResponseDto[] | null;
};

export { type UsersToGroupsGetAllResponseDto, type UsersToGroupsResponseDto };
