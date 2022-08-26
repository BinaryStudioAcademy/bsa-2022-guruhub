import { FastifyRequest } from 'fastify';

import {
  ExceptionMessage,
  HttpCode,
  PermissionKey,
} from '~/common/enums/enums';
import { PermissionsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

const checkIsAbleToWriteInterviewNote =
  <T>() =>
  async (req: FastifyRequest<T>): Promise<void> => {
    const { user } = req;
    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }

    const isAdmin = checkHasPermission({
      permissionKeys: [PermissionKey.MANAGE_INTERVIEWS],
      userPermissions: user.permissions,
    });

    const isCandidate = checkHasPermission({
      permissionKeys: [PermissionKey.MANAGE_INTERVIEW],
      userPermissions: user.permissions,
    });

    if (!isAdmin && !isCandidate) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }
  };

export { checkIsAbleToWriteInterviewNote };
