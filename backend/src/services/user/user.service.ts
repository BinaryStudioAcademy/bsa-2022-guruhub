import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserSignInResponseDto,
  UserPasswordHashDto,
  UserSignInRequestDto,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import bcrypt from 'bcrypt';

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

  async getPasswordHashByEmail(
    email: string,
  ): Promise<UserPasswordHashDto | null> {
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      password_hash: user.passwordHash,
    };
  }

  async verifySignIn(
    signInUserDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto | null> {
    const user = await this.getPasswordHashByEmail(signInUserDto.email);

    if (!user) {
      return null;
    }

    let res: UserSignInResponseDto | null = null;

    bcrypt.compare(
      signInUserDto.password,
      user.password_hash,
      (_err, result) => {
        if (result) {
          res = {
            id: user.id,
            email: user.email,
          };
        }
      },
    );
    return res;
  }
}

export { User };
