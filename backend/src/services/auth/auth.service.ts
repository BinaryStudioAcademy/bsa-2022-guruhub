import { ExceptionMessage, HttpCode } from '~/common/enums/enums';
import {
  UsersByIdResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
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

  constructor({ userService, encryptService, tokenService }: Constructor) {
    this.#userService = userService;
    this.#encryptService = encryptService;
    this.#tokenService = tokenService;
  }

  async signUp(
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
    const permissions = await this.#userService.getUserPermissions(user.id);

    return {
      user,
      token,
      permissions,
    };
  }

  async verifySignIn(
    signInUserDto: UserSignInRequestDto,
  ): Promise<UsersByIdResponseDto> {
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

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      createdAt: user.createdAt,
    };
  }

  async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.verifySignIn(userRequestDto);
    const token = await this.#tokenService.create({ userId: user.id });
    const permissions = await this.#userService.getUserPermissions(user.id);

    return {
      user,
      token,
      permissions,
    };
  }

  async getCurrentUser(token: string): Promise<UsersByIdResponseDto | null> {
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
