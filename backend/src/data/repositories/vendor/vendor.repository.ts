import { VendorKey } from '~/common/enums/enums';
import { Vendor as VendorM } from '~/data/models/models';

type Constructor = {
  VendorModel: typeof VendorM;
};

class Vendor {
  #VendorModel: typeof VendorM;

  public constructor({ VendorModel }: Constructor) {
    this.#VendorModel = VendorModel;
  }

  public async getByKey(key: VendorKey): Promise<VendorM | null> {
    const vendor = await this.#VendorModel
      .query()
      .select()
      .where({ key })
      .first();

    return vendor ?? null;
  }
}

export { Vendor };
