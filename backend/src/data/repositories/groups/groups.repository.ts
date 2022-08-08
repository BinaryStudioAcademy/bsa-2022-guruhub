import { Groups as GroupsM } from '~/data/models/models';

type Constructor = {
  GroupsModel: typeof GroupsM;
};

class Groups {
  #GroupsModel: typeof GroupsM;

  constructor({ GroupsModel }: Constructor) {
    this.#GroupsModel = GroupsModel;
  }

  async create(group: { name: string; key: string }): Promise<GroupsM> {
    const { name, key } = group;

    return this.#GroupsModel.query().insert({
      name,
      key,
    });
  }
}

export { Groups };
