import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserByEmailDto,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';

type Constructor = {
  userRepository: typeof userRep;
};

class User {
  #userRepository: typeof userRep;

  constructor({ userRepository }: Constructor) {
    this.#userRepository = userRepository;
  }

  async getAll(): Promise<UserSignUpResponseDto[]> {
    const users = await this.#userRepository.getAll();

    return users.map((user) => ({
      id: user.id,
      email: user.email,
    }));
  }

  async create(
    createUserDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const passwordSalt = 'SALT'; // TODO
    const passwordHash = 'HASH'; // TODO

    const user = await this.#userRepository.create({
      email: createUserDto.email,
      passwordSalt,
      passwordHash,
    });

    return {
      id: user.id,
      email: user.email,
    };
  }

  async getByEmail(email: string): Promise<UserByEmailDto | null> {
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      passwordHash: user.passwordHash,
    };
  }
}

export { User };
