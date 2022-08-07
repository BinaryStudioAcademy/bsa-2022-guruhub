import { AuthError } from '~/exceptions/exceptions';
import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { ValidationMessage, HttpCode } from '~/common/enums/enums';
import { user as userServ } from '~/services/services';

type Constructor = {
  userService: typeof userServ;
};

class Auth {
  #userService: typeof userServ;

  constructor({ userService }: Constructor) {
    this.#userService = userService;
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
}

export { Auth };
