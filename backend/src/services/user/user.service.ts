import { HttpCode } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  PermissionsGetAllItemResponseDto,
  UsersByEmailResponseDto,
  UsersByIdResponseDto,
  UsersGetResponseDto,
  UserSignUpRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { PermissionsError } from '~/exceptions/permission-error/permission-error.exception';
import { Encrypt } from '~/services/encrypt/encrypt.service';

type Constructor = {
  userRepository: typeof userRep;
  encryptService: Encrypt;
};

class User {
  #userRepository: typeof userRep;

  #encryptService: Encrypt;

  public constructor({ userRepository, encryptService }: Constructor) {
    this.#userRepository = userRepository;
    this.#encryptService = encryptService;
  }

  public async getAll({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<UsersGetResponseDto>
  > {
    const ZERO_INDEXED_PAGE = page - 1;
    const result = await this.#userRepository.getAll({
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

  public async create({
    email,
    fullName,
    password,
  }: UserSignUpRequestDto): Promise<UserWithPermissions> {
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
      permissions: [],
    };
  }

  public async getByEmail(
    email: string,
  ): Promise<UsersByEmailResponseDto | null> {
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

  public getUserPermissions(
    id: number,
  ): Promise<PermissionsGetAllItemResponseDto[]> {
    return this.#userRepository.getUserPermissions(id);
  }

  public async getById(id: string): Promise<UserWithPermissions | null> {
    const user = await this.#userRepository.getById(id);

    if (!user) {
      return null;
    }
    const permissions = await this.#userRepository.getUserPermissions(user.id);

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
      permissions,
    };
  }

  public async getByIds(ids: number[]): Promise<UsersByIdResponseDto[]> {
    const users = await this.#userRepository.getByIds(ids);

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
    }));
  }

  public async delete(userId: number, id: number): Promise<boolean> {
    if (userId === id) {
      throw new PermissionsError({
        status: HttpCode.BAD_REQUEST,
      });
    }

    const deletedUsersCount = await this.#userRepository.delete(id);

    return Boolean(deletedUsersCount);
  }
}

export { User };
