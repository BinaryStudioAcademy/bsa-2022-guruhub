import { HttpCode } from 'guruhub-shared';

import { CATEGORY_KEYS } from '~/lib/common/constants/objects.constants';
import { apiSessionStorage, categoriesService } from '~/lib/services/services';
import { allCategoriesSchema } from '~/tests/json-schemas/json-schemas';

describe('Get all categories tests', () => {
  before(() => apiSessionStorage.addAndEnterSession('default'));

  after(() => apiSessionStorage.removeSession('default'));

  it('should get correct set of categories', async () => {
    const response = await categoriesService.getAll();

    const keys = Object.values(CATEGORY_KEYS);

    response.should.have.status(HttpCode.OK);
    response.should.have.normalExecutionTime;
    response.body.should.have.jsonSchema(allCategoriesSchema);

    response.body.items
      .map(({ key }) => key)
      .sort()
      .should.be.deep.equal(keys.sort());
  });
});
