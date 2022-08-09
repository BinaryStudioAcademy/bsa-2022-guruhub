type PermissionsGetAllItemResponseDto = {
  id: number;
  key: string;
  name: string;
};

type PermissionsGetAllResponseDto = {
  items: PermissionsGetAllItemResponseDto[];
};

export { type PermissionsGetAllResponseDto };
