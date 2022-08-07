import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { Encrypt } from '~/services/encrypt/encrypt.service';

type Constructor = {
  userRepository: typeof userRep;
  encryptService: Encrypt;
};

class User {
  #userRepository: typeof userRep;
  #encryptService: Encrypt;

  constructor({ userRepository, encryptService }: Constructor) {
    this.#userRepository = userRepository;
    this.#encryptService = encryptService;
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

  async create({
    email,
    fullName,
    password,
  }: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    const passwordSalt = await this.#encryptService.generateSalt();
    const passwordHash = await this.#encryptService.encrypt(
      password,
      passwordSalt,
    );

    const user = await this.#userRepository.create({
      email,
      fullName,
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
