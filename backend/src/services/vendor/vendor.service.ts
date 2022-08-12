import { VendorKey } from '~/common/enums/enums';
import { VendorGetResponseDto } from '~/common/types/types';
import { vendor as vendorRep } from '~/data/repositories/repositories';

type Constructor = {
  vendorRepository: typeof vendorRep;
};

class Vendor {
  #vendorRepository: typeof vendorRep;

  constructor({ vendorRepository }: Constructor) {
    this.#vendorRepository = vendorRepository;
  }

  async getByKey(key: VendorKey): Promise<VendorGetResponseDto | null> {
    const vendor = await this.#vendorRepository.getByKey(key);

    return vendor ?? null;
  }
}

export { Vendor };
