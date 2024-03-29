import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import {
  EntityPagination,
  EntityPaginationRequestQueryDto,
  PermissionsGetAllItemResponseDto,
  UsersBasicInfoDto,
  UsersByEmailResponseDto,
  UsersGetResponseDto,
  UserSignUpRequestDto,
  UserWithPermissions,
} from '~/common/types/types';
import { user as userRep } from '~/data/repositories/repositories';
import { UsersError } from '~/exceptions/exceptions';
import { convertPageToZeroIndexed } from '~/helpers/helpers';
import { Encrypt } from '~/services/encrypt/encrypt.service';
import {
  coursesToMentors as coursesToMentorsServ,
  interview as interviewServ,
  menteesToMentors as menteesToMentorsServ,
  userDetails as userDetailsServ,
} from '~/services/services';

type Constructor = {
  userRepository: typeof userRep;
  encryptService: Encrypt;
  userDetailsService: typeof userDetailsServ;
  coursesToMentorsService: typeof coursesToMentorsServ;
  menteesToMentorsService: typeof menteesToMentorsServ;
  interviewService: typeof interviewServ;
};

class User {
  #userRepository: typeof userRep;

  #encryptService: Encrypt;

  #userDetailsService: typeof userDetailsServ;

  #coursesToMentorsService: typeof coursesToMentorsServ;

  #menteesToMentorsService: typeof menteesToMentorsServ;

  #interviewService: typeof interviewServ;

  public constructor({
    userRepository,
    encryptService,
    userDetailsService,
    coursesToMentorsService,
    menteesToMentorsService,
    interviewService,
  }: Constructor) {
    this.#userRepository = userRepository;
    this.#encryptService = encryptService;
    this.#userDetailsService = userDetailsService;
    this.#coursesToMentorsService = coursesToMentorsService;
    this.#menteesToMentorsService = menteesToMentorsService;
    this.#interviewService = interviewService;
  }

  public async getAll({
    page,
    count,
  }: EntityPaginationRequestQueryDto): Promise<
    EntityPagination<UsersGetResponseDto>
  > {
    const zeroIndexPage = convertPageToZeroIndexed(page);
    const result = await this.#userRepository.getAll({
      page: zeroIndexPage,
      count,
    });

    return {
      items: result.items.map((user) => ({
        id: user.id,
        email: user.email,
        userDetails: user.userDetails,
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
      passwordSalt,
      passwordHash,
    });

    const userDetails = await this.#userDetailsService.create(user.id, {
      fullName,
      gender: null,
      dateOfBirth: null,
      telegramUsername: null,
    });

    return {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
      userDetails,
      permissions: [],
    };
  }

  public async getByEmail(
    email: string,
  ): Promise<UsersByEmailResponseDto | null> {
    const user = await this.#userRepository.getByEmail(email);

    return user ?? null;
  }

  public getUserPermissions(
    id: number,
  ): Promise<PermissionsGetAllItemResponseDto[]> {
    return this.#userRepository.getUserPermissions(id);
  }

  public async getById(id: number): Promise<UserWithPermissions | null> {
    const user = await this.#userRepository.getById(id);

    if (!user) {
      return null;
    }

    const permissions = await this.#userRepository.getUserPermissions(user.id);

    return {
      id: user.id,
      email: user.email,
      userDetails: user.userDetails,
      createdAt: user.createdAt,
      permissions,
    };
  }

  public async getByIdMoneyBalance(id: number): Promise<number> {
    const balance = await this.#userRepository.getByIdMoneyBalance(id);

    return balance.value;
  }

  public async getByIds(ids: number[]): Promise<UsersBasicInfoDto[]> {
    const users = await this.#userRepository.getByIds(ids);

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }

  public async delete(
    loggedInUser: UserWithPermissions,
    idToDelete: number,
  ): Promise<boolean> {
    if (loggedInUser.id === idToDelete) {
      throw new UsersError();
    }

    const isMentorForAnyCourse =
      await this.#coursesToMentorsService.checkIsMentorForAnyCourse(idToDelete);

    if (isMentorForAnyCourse) {
      throw new UsersError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ExceptionMessage.MENTOR_CAN_NOT_BE_DELETED,
      });
    }

    const isMenteeForAnyCourse =
      await this.#menteesToMentorsService.checkIsMenteeForAnyCourse(idToDelete);

    if (isMenteeForAnyCourse) {
      throw new UsersError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ExceptionMessage.MENTEE_CAN_NOT_BE_DELETED,
      });
    }

    const isInterviewee = await this.#interviewService.checkIsInterviewee(
      idToDelete,
    );

    if (isInterviewee) {
      throw new UsersError({
        status: HttpCode.INTERNAL_SERVER_ERROR,
        message: ExceptionMessage.INTERVIEWEE_CAN_NOT_BE_DELETED,
      });
    }
    const deletedUsersCount = await this.#userRepository.delete(idToDelete);

    return Boolean(deletedUsersCount);
  }
}

export { User };
