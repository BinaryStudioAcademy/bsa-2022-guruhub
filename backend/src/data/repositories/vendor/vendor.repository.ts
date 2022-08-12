import { VendorKey } from '~/common/enums/enums';
import { Vendor as VendorM } from '~/data/models/models';

type Constructor = {
  VendorModel: typeof VendorM;
};

class Vendor {
  #VendorModel: typeof VendorM;

  constructor({ VendorModel }: Constructor) {
    this.#VendorModel = VendorModel;
  }

  async getByKey(key: VendorKey): Promise<VendorM | null> {
    const vendor = await this.#VendorModel
      .query()
      .select()
      .where({ key })
      .first();

    return vendor ?? null;
  }
}

export { Vendor };
