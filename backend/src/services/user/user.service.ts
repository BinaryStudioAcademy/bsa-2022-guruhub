import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  UserGetResponseDto,
  UsersByEmailResponseDto,
  UsersByIdResponseDto,
  UserSignUpRequestDto,
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

  async getPaginated({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<UserGetResponseDto>
  > {
    const ZERO_INDEXED_PAGE = page - 1;
    const result = await this.#userRepository.getPaginated({
      page: ZERO_INDEXED_PAGE,
      count,
    });

    return {
      items: result.items.map((user) => ({
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        createdAt: user.createdAt,
      })),
      total: result.total,
    };
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

  async getById(id: string): Promise<UsersByIdResponseDto | null> {
    const user = await this.#userRepository.getById(id);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
    };
  }

  async delete(id: number): Promise<boolean> {
    const deletedUsersCount = await this.#userRepository.delete(id);

    return Boolean(deletedUsersCount);
  }
}

export { User };
