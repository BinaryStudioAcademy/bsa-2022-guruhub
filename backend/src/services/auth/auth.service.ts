import {
  UserSignInRequestDto,
  UserSignInResponseDto,
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userServ, encrypt as encryptServ } from '~/services/services';
import { ValidationMessage } from '~/common/enums/enums';
import { UserError } from '~/exceptions/exceptions';

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

  signUp(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#userService.create(userRequestDto);
  }

  async verifySignIn(
    signInUserDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto | null> {
    const user = await this.#userService.getByEmail(signInUserDto.email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await this.#encryptService.comparePasswords(
      user.passwordHash,
      signInUserDto.password,
    );

    return isPasswordValid ? { id: user.id, email: user.email } : null;
  }

  async signIn(
    userRequestDto: UserSignInRequestDto,
  ): Promise<UserSignInResponseDto> {
    const user = await this.verifySignIn(userRequestDto);

    if (!user) {
      throw new UserError(ValidationMessage.BAD_CREDENTIALS);
    }

    return user;
  }
}

export { Auth };
