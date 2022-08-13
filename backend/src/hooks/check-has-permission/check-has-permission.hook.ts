import { FastifyRequest } from 'fastify';

import {
  ExceptionMessage,
  HttpCode,
  PermissionKey,
} from '~/common/enums/enums';
import { EntityPaginationRequestQueryDto } from '~/common/types/types';
import { PermissionsError } from '~/exceptions/exceptions';
import { checkHasPermission } from '~/helpers/helpers';

const checkHasPermissions =
  (...pagePermissions: PermissionKey[]) =>
  async (
    req: FastifyRequest<{ Querystring: EntityPaginationRequestQueryDto }>,
  ): Promise<void> => {
    const { user } = req;
    const hasUser = Boolean(user);
    const userPermissions = user.permissions.map((item) => item.key);

    if (!hasUser) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }

    const hasUserPermission = checkHasPermission({
      pagePermissions,
      userPermissions,
    });

    if (!hasUserPermission) {
      throw new PermissionsError({
        message: ExceptionMessage.PERMISSION_LACK,
        status: HttpCode.FORBIDDEN,
      });
    }
  };

export { checkHasPermissions };
