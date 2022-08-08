import { Groups as GroupsM } from '~/data/models/models';
import { changeStringCase } from '~/helpers';
import { Case } from '~/common/enums/case/case.enum';

type Constructor = {
  GroupsModel: typeof GroupsM;
};

class Groups {
  #GroupsModel: typeof GroupsM;

  constructor({ GroupsModel }: Constructor) {
    this.#GroupsModel = GroupsModel;
  }

  async create(group: { name: string }): Promise<GroupsM> {
    const { name } = group;

    return this.#GroupsModel.query().insert({
      name,
      key: changeStringCase(name, Case.KEBAB),
    });
  }
}

export { Groups };
