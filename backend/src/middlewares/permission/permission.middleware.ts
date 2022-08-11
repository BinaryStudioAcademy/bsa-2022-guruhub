import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpCode, Permissions } from '~/common/enums/enums';
import { PermissionError } from '~/exceptions/exceptions';
import { groupsToPermissions, usersToGroups } from '~/services/services';

const hasPermission = (permissionId: Permissions) => {
  return async (req: FastifyRequest, reply: FastifyReply): Promise<void> => {
    try {
      const allUserGroups = await usersToGroups.getGroupsByUserId(req.user.id);
      const groupsIds = allUserGroups.items?.map((group) => group.groupId);

      if (!groupsIds) {
        throw new PermissionError();
      }

      const permissions = [];
      for (const groupId of groupsIds) {
        const groupPermissions =
          await groupsToPermissions.getPermissionsByGroupId(groupId);
        const permissionsIds = groupPermissions.map(
          (item) => item.permissionId,
        );
        permissions.push(...permissionsIds);
      }

      if (!permissions.includes(permissionId)) {
        throw new PermissionError();
      }
    } catch (err) {
      reply.code(HttpCode.FORBIDDEN).send(err);
    }
  };
};

export { hasPermission };
