import { HttpCode, HttpStatusMessage } from '~/common/enums/enums';

type HttpErrorDto = {
  statusCode: HttpCode;
  error: HttpStatusMessage;
  message: string;
};

export { type HttpErrorDto };
