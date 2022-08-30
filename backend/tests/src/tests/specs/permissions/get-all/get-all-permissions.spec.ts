import {
  EntityPagination,
  HttpCode,
  HttpErrorDto,
  HttpStatusMessage,
  PermissionKey,
  PermissionsGetAllItemResponseDto,
  UserSignInResponseDto,
} from 'guruhub-shared';

import { Response } from '~/lib/common/types/types';
import {
  apiSessionStorage,
  authService,
  httpService,
  permissionsService,
} from '~/lib/services/services';
import {
  allPermissionsSchema,
  errorResponseSchema,
  signInResponseSchema,
} from '~/tests/json-schemas/json-schemas';

describe('Get all permissions tests', () => {
  before(() => apiSessionStorage.addAndEnterSession('default'));
  after(() => apiSessionStorage.removeSession('default'));

  before('should log in as UAM manager', async () => {
    const response = (await authService.signIn(
      testsConfig.users.uamManager,
    )) as Response<UserSignInResponseDto>;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(signInResponseSchema);

    httpService.setToken(response.body.token);
  });

  it('should reject to get permissions for unauthorized user', async () => {
    apiSessionStorage.addAndEnterSession('unauthorized');

    const response =
      (await permissionsService.getAll()) as Response<HttpErrorDto>;

    apiSessionStorage.enterSessionAndRemovePrevious('default');

    response.should.have.status(HttpCode.UNAUTHORIZED);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(errorResponseSchema);
    response.body.error.should.be.equal(HttpStatusMessage.UNAUTHORIZED);
  });

  it('should get correct set of permissions', async () => {
    const response = (await permissionsService.getAll()) as Response<
      EntityPagination<PermissionsGetAllItemResponseDto>
    >;

    const keys = Object.values(PermissionKey);
    const permissionsCount = keys.length;

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(allPermissionsSchema);
    response.body.total.should.be.equal(permissionsCount);
    response.body.items.map(({ key }) => key).should.be.deep.equal(keys);
  });
});
