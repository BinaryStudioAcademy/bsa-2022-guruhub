type GroupsGetByIdResponseDto = {
  id: number;
  name: string;
  key: string;
  permissions: number[];
  users: number[];
};

export { type GroupsGetByIdResponseDto };
