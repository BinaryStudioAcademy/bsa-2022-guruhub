import {
  UserSignUpRequestDto,
  UserSignUpResponseDto,
} from '~/common/types/types';
import { user as userServ } from '~/services/services';

type Constructor = {
  userService: typeof userServ;
};

class Auth {
  #userService: typeof userServ;

  constructor({ userService }: Constructor) {
    this.#userService = userService;
  }

  signUp(userRequestDto: UserSignUpRequestDto): Promise<UserSignUpResponseDto> {
    return this.#userService.create(userRequestDto);
  }
}

export { Auth };
