type UserDetailsResponseDto = {
  id: number;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  gender: string | null;
  avatarUrl: string | null;
  dateOfBirth: string | null;
};

export { type UserDetailsResponseDto };
