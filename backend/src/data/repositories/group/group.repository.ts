import { Group as GroupM } from '~/data/models/models';

type Constructor = {
  GroupModel: typeof GroupM;
};

class Group {
  #GroupModel: typeof GroupM;

  constructor({ GroupModel }: Constructor) {
    this.#GroupModel = GroupModel;
  }

  async create(group: { name: string; key: string }): Promise<GroupM> {
    const { name, key } = group;

    return this.#GroupModel.query().insert({
      name,
      key,
    });
  }

  async getByName(name: string): Promise<GroupM | null> {
    const group = await this.#GroupModel
      .query()
      .select()
      .where({ name })
      .first();

    return group ?? null;
  }

  async getAll(): Promise<GroupM[]> {
    return this.#GroupModel.query();
  }
}

export { Group };
