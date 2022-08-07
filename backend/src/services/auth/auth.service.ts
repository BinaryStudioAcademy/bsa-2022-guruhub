import {
  UserSignUpRequestDto,
  UserSignUpTokenResponseDto,
} from '~/common/types/types';
import { createToken } from '~/helpers/helpers';
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
  ): Promise<UserSignUpTokenResponseDto> {
    return {
      token: createToken({ data: userRequestDto }),
      user: await this.#userService.create(userRequestDto),
    };
  }
}

export { Auth };
