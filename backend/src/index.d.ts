import { SocketServer, UserWithPermissions } from '~/common/types/types';

declare module 'fastify' {
  export interface FastifyRequest {
    user: UserWithPermissions;
    fileBuffer: Buffer;
    io: SocketServer;
  }
}
