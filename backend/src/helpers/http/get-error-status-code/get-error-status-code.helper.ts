import {
  HttpCode,
  CustomExceptionName,
} from 'guruhub-shared/common/enums/enums';

const getErrorStatusCode = (error: Error): number => {
  const hasNameProp = Object.prototype.hasOwnProperty.call(error, 'name');
  if (!hasNameProp) {
    return HttpCode.INTERNAL_SERVER_ERROR;
  }

  switch (error.name) {
    case CustomExceptionName.INVALID_CREDENTIALS: {
      return HttpCode.UNAUTHORIZED;
    }
    default: {
      return HttpCode.INTERNAL_SERVER_ERROR;
    }
  }
};

export { getErrorStatusCode };
