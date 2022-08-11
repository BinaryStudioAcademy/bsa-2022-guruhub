import { Vendor as VendorM } from '~/data/models/models';

type Constructor = {
  VendorModel: typeof VendorM;
};

class Vendor {
  #VendorModel: typeof VendorM;

  constructor({ VendorModel }: Constructor) {
    this.#VendorModel = VendorModel;
  }

  async getById(id: number): Promise<VendorM | null> {
    const vendor = await this.#VendorModel
      .query()
      .select()
      .where({ id })
      .first();

    return vendor ?? null;
  }
}

export { Vendor };
