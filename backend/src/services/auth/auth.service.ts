import { InvalidCredentials } from '~/exceptions/exceptions';
import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userServ } from '~/services/services';
import { ExceptionMessage } from '~/common/enums/enums';

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
      throw new InvalidCredentials({
        message: ExceptionMessage.EMAIL_ALREADY_EXISTS,
      });
    }
    return this.#userService.create(userRequestDto);
  }
}

export { Auth };
