import { FastifyRequest } from 'fastify';

import {
  ExceptionMessage,
  HttpCode,
  PermissionKey,
} from '~/common/enums/enums';
import { PermissionsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

const checkHasPermissions =
  (...pagePermissions: PermissionKey[]) =>
  async (req: FastifyRequest): Promise<void> => {
    const { user } = req;
    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }

    const hasUserPermission = checkHasPermission({
      permissionKeys: pagePermissions,
      userPermissions: user.permissions,
    });

    if (!hasUserPermission) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }
  };

export { checkHasPermissions };
