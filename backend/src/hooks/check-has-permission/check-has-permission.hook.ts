import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpCode, PermissionKey } from '~/common/enums/enums';
import { UsersByIdResponseDto } from '~/common/types/types';
import { PermissionsError } from '~/exceptions/exceptions';

const checkHasPermissions =
  (permissions: PermissionKey[]) =>
  async (req: FastifyRequest, rep: FastifyReply): Promise<void> => {
    try {
      const userPermissions =
        (
          req.user as UsersByIdResponseDto & {
            permissions: [];
          }
        ).permissions ?? [];

      if (!checkPermissionKeys(permissions, userPermissions)) {
        throw new PermissionsError();
      }
    } catch (err) {
      rep.code(HttpCode.FORBIDDEN).send(err);
    }
  };

const checkPermissionKeys = (
  requiredPermissions: PermissionKey[],
  userPermissions: PermissionKey[],
): boolean =>
  requiredPermissions.every((permission) =>
    userPermissions.includes(permission),
  );

export { checkHasPermissions };
