import { Vendor as VendorM } from '~/data/models/models';

type Constructor = {
  VendorModel: typeof VendorM;
};

class Vendor {
  #VendorModel: typeof VendorM;

  constructor({ VendorModel }: Constructor) {
    this.#VendorModel = VendorModel;
  }

  async getAll(): Promise<VendorM[]> {
    return this.#VendorModel.query();
  }

  async create(vendor: { name: string; key: string }): Promise<VendorM> {
    const { name, key } = vendor;

    return this.#VendorModel.query().insert({
      name,
      key,
    });
  }
}

export { Vendor };
