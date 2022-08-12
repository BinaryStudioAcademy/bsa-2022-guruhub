import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpCode, PermissionKey } from '~/common/enums/enums';
import { UsersByIdResponseDto } from '~/common/types/types';
import { PermissionsError } from '~/exceptions/exceptions';
import { checkPermissionKeys } from '~/helpers/helpers';

const checkHasPermissions =
  (...requiredPermissions: PermissionKey[]) =>
  async (req: FastifyRequest, rep: FastifyReply): Promise<void> => {
    try {
      const userPermissions =
        (
          req.user as UsersByIdResponseDto & {
            permissions: [];
          }
        ).permissions ?? [];

      if (
        !checkPermissionKeys({
          requiredPermissions,
          userPermissions,
        })
      ) {
        throw new PermissionsError();
      }
    } catch (err) {
      rep.code(HttpCode.FORBIDDEN).send(err);
    }
  };

export { checkHasPermissions };
