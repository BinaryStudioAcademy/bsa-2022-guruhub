import {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userServ, encrypt as encryptServ } from '~/services/services';
import { HttpCode, ValidationMessage } from '~/common/enums/enums';
import { AuthError } from '~/exceptions/exceptions';

type Constructor = {
  userService: typeof userServ;
  encryptService: typeof encryptServ;
};

class Auth {
  #userService: typeof userServ;
  #encryptService: typeof encryptServ;

  constructor({ userService, encryptService }: Constructor) {
    this.#userService = userService;
    this.#encryptService = encryptService;
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
    return this.#userService.create(userRequestDto);
  }

  async verifySignIn(
    signInUserDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto | null> {
    const user = await this.#userService.getByEmail(signInUserDto.email);

    if (!user) {
      return null;
    }

    const encryptionData = {
      salt: user.passwordSalt,
      passwordHash: user.passwordHash,
    };

    const isPasswordValid = await this.#encryptService.compare(
      signInUserDto.password,
      encryptionData,
    );

    return isPasswordValid ? { id: user.id, email: user.email } : null;
  }

  async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.verifySignIn(userRequestDto);

    if (!user) {
      throw new AuthError({
        status: HttpCode.BAD_REQUEST,
        message: ValidationMessage.BAD_CREDENTIALS,
      });
    }

    return user;
  }
}

export { Auth };
