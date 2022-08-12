import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpCode, PermissionKey } from '~/common/enums/enums';
import { UsersByIdResponseDto } from '~/common/types/types';
import { PermissionError } from '~/exceptions/exceptions';

const checkHasPermissions =
  (...permissions: PermissionKey[]) =>
  async (req: FastifyRequest, rep: FastifyReply): Promise<void> => {
    try {
      const userPermissions =
        (
          req.user as UsersByIdResponseDto & {
            permissions: [];
          }
        ).permissions ?? [];

      if (!checkPermissionKeys(permissions, userPermissions)) {
        throw new PermissionError();
      }
    } catch (err) {
      rep.code(HttpCode.FORBIDDEN).send(err);
    }
  };

const checkPermissionKeys = (
  target: PermissionKey[],
  arr: PermissionKey[],
): boolean => target.every((elem) => arr.includes(elem));

export { checkHasPermissions };
