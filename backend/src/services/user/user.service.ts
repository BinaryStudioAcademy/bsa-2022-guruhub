import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { encrypt as encryptService } from '~/services/services';

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

  async getByEmail(email: string): Promise<UserSignUpResponseDto | null> {
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      return null;
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
    const passwordSalt = await encryptService.generateSalt();
    const passwordHash = await encryptService.encrypt(password, passwordSalt);

    const user = await this.#userRepository.create({
      email: createUserDto.email,
      full_name: createUserDto.full_name,
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
