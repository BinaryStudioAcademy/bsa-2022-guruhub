import {
  UsersByIdResponseDto,
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import {
  user as userServ,
  encrypt as encryptServ,
  token as tokenServ,
} from '~/services/services';
import { HttpCode, ValidationMessage } from '~/common/enums/enums';
import { AuthError } from '~/exceptions/exceptions';

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
        message: ValidationMessage.EMAIL_ALREADY_EXISTS,
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

  async verifySignIn(
    signInUserDto: UserSignInRequestDto,
  ): Promise<UsersByIdResponseDto> {
    const user = await this.#userService.getByEmail(signInUserDto.email);

    if (!user) {
      throw new AuthError({
        status: HttpCode.BAD_REQUEST,
        message: ValidationMessage.BAD_CREDENTIALS,
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
        message: ValidationMessage.BAD_CREDENTIALS,
      });
    }

    return { id: user.id, email: user.email };
  }

  async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.verifySignIn(userRequestDto);
    const token = await this.#tokenService.create({ userId: user.id });

    return {
      user,
      token,
    };
  }
}

export { Auth };
