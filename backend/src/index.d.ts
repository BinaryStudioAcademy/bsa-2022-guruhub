import { UsersByIdResponseDto } from '~/common/types/types';

declare module 'fastify' {
  export interface FastifyRequest {
    user: UsersByIdResponseDto;
  }
}
