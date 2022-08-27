type UsersWithDetails = {
  id: number;
  email: string;
  createdAt: string;
  userDetails: {
    avatarUrl: string | null;
    createdAt: string;
    dateOfBirth: string | null;
    fullName: string;
    gender: string | null;
    id: number;
    userId: number;
  };
};

export { type UsersWithDetails };
