import { HttpError } from '~/exceptions/exceptions';

type Constructor = {
  code: number;
  message: string;
};
class AuthError extends HttpError {
  constructor({ code, message }: Constructor) {
    super();
    this.message = message;
    this.status = code;
  }
}

export { AuthError };
