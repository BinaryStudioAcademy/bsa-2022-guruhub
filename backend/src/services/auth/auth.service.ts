import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
  UserWithPermissions,
} from '~/common/types/types';
import { AuthError } from '~/exceptions/exceptions';
import {
  encrypt as encryptServ,
  token as tokenServ,
  user as userServ,
} from '~/services/services';

type Constructor = {
  userService: typeof userServ;
  tokenService: typeof tokenServ;
  encryptService: typeof encryptServ;
};

class Auth {
  #userService: typeof userServ;

  #tokenService: typeof tokenServ;

  #encryptService: typeof encryptServ;

  public constructor({
    userService,
    encryptService,
    tokenService,
  }: Constructor) {
    this.#userService = userService;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
  }

  public async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    const { email } = userRequestDto;
    const userByEmail = await this.#userService.getByEmail(email);

    if (userByEmail) {
      throw new AuthError({
        message: ExceptionMessage.BAD_CREDENTIALS,
        status: HttpCode.UNAUTHORIZED,
      });
    }

    const user = await this.#userService.create(userRequestDto);
    const token = await this.#tokenService.create({ userId: user.id });

    return {
      user,
      token,
    };
  }

  public async verifySignIn(
    signInUserDto: UserSignInRequestDto,
  ): Promise<UserWithPermissions> {
    const user = await this.#userService.getByEmail(signInUserDto.email);

    if (!user) {
      throw new AuthError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.BAD_CREDENTIALS,
      });
    }

    const encryptionData = {
      data: signInUserDto.password,
      salt: user.passwordSalt,
      passwordHash: user.passwordHash,
    };

    const isPasswordValid = await this.#encryptService.compare(encryptionData);

    if (!isPasswordValid) {
      throw new AuthError({
        status: HttpCode.BAD_REQUEST,
        message: ExceptionMessage.BAD_CREDENTIALS,
      });
    }

    const permissions = await this.#userService.getUserPermissions(user.id);

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
      permissions,
    };
  }

  public async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.verifySignIn(userRequestDto);
    const token = await this.#tokenService.create({ userId: user.id });

    return {
      user,
      token,
    };
  }

  public async getCurrentUser(
    token: string,
  ): Promise<UserWithPermissions | null> {
    try {
      const { userId } = await this.#tokenService.decode(token);
      const user = await this.#userService.getById(userId);

      return user;
    } catch {
      throw new AuthError({
        status: HttpCode.UNAUTHORIZED,
        message: ExceptionMessage.UNAUTHORIZED_USER,
      });
    }
  }
}

export { Auth };
