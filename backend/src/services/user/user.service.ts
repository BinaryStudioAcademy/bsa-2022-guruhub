import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt, generateSalt } from '~/helpers/helpers';

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

  async getByEmail(email: string): Promise<UserSignUpResponseDto | undefined> {
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      return undefined;
    }

    return {
      id: user.id,
      email: user.email,
    };
  }

  async create(
    createUserDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const { password } = createUserDto;
    const passwordSalt = await generateSalt();
    const passwordHash = await encrypt(password, passwordSalt);

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
}

export { User };
