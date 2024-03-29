import { FastifyRequest } from 'fastify';

import {
  ExceptionMessage,
  HttpCode,
  PermissionKey,
} from '~/common/enums/enums';
import { CheckPermisssionType } from '~/common/types/types';
import { PermissionsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

const checkHasPermissions =
  <T>(type: CheckPermisssionType, ...pagePermissions: PermissionKey[]) =>
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
      checkMode: type,
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
