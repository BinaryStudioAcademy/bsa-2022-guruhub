import { FastifyRequest } from 'fastify';

import {
  ExceptionMessage,
  HttpCode,
  PermissionKey,
} from '~/common/enums/enums';
import { PermissionsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

type checkType = 'every' | 'oneOf';

const checkHasPermissions =
  <T>(type: checkType, ...pagePermissions: PermissionKey[]) =>
  async (req: FastifyRequest<T>): Promise<void> => {
    const { user } = req;
    const hasUser = Boolean(user);

    if (!hasUser) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }

    const hasUserAllPermissions = checkHasPermission({
      checkMode: type === 'oneOf' ? 'oneOf' : 'every',
      permissionKeys: pagePermissions,
      userPermissions: user.permissions,
    });

    if (!hasUserAllPermissions) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }
  };

export { checkHasPermissions };
