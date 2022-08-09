import {
  UserSignUpRequestDto,
  UsersByEmailResponseDto,
  UsersByIdResponseDto,
  UsersGetAllResponseDto,
} from '~/common/types/types';
import {
  user as userRep,
  usersToGroups as usersToGroupsRep,
} from '~/data/repositories/repositories';
import { Encrypt } from '~/services/encrypt/encrypt.service';

type Constructor = {
  userRepository: typeof userRep;
  usersToGroupsRepository: typeof usersToGroupsRep;
  encryptService: Encrypt;
};

class User {
  #userRepository: typeof userRep;
  #usersToGroupsRepository: typeof usersToGroupsRep;
  #encryptService: Encrypt;

  constructor({
    userRepository,
    usersToGroupsRepository,
    encryptService,
  }: Constructor) {
    this.#userRepository = userRepository;
    this.#usersToGroupsRepository = usersToGroupsRepository;
    this.#encryptService = encryptService;
  }

  async getAll(): Promise<UsersGetAllResponseDto> {
    const users = await this.#userRepository.getAll();

    const usersWithGroups = await Promise.all(
      users.map(async (user) => {
        const groups = await this.#usersToGroupsRepository.getByUserId(user.id);

        return {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          createdAt: user.createdAt,
          groups,
        };
      }),
    );

    return usersWithGroups;
  }

  async create({
    email,
    fullName,
    password,
  }: UserSignUpRequestDto): Promise<UsersByIdResponseDto> {
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
      fullName: user.fullName,
      createdAt: user.createdAt,
    };
  }

  async getByEmail(email: string): Promise<UsersByEmailResponseDto | null> {
    const user = await this.#userRepository.getByEmail(email);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      passwordHash: user.passwordHash,
      passwordSalt: user.passwordSalt,
      createdAt: user.createdAt,
    };
  }
}

export { User };
