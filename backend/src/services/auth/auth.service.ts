import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userServ, token as tokenServ } from '~/services/services';

type Constructor = {
  userService: typeof userServ;
  tokenService: typeof tokenServ;
};

class Auth {
  #userService: typeof userServ;
  #tokenService: typeof tokenServ;

  constructor({ userService, tokenService }: Constructor) {
    this.#userService = userService;
    this.#tokenService = tokenService;
  }

  async signUp(
    userRequestDto: UserSignUpRequestDto,
  ): Promise<UserSignUpResponseDto> {
    return {
      token: await this.#tokenService.create({ data: userRequestDto }),
      user: await this.#userService.create(userRequestDto),
    };
  }
}

export { Auth };
