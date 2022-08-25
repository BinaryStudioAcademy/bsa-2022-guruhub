type UsersTableActionsProps = {
  id: number;
  onDelete: (id: number) => void;
  currentLoggedInUser: boolean;
};

export { type UsersTableActionsProps };
