import { VendorGetResponseDto } from 'guruhub-shared';

type VendorExpected = Pick<VendorGetResponseDto, 'key' | 'name'>;

export { VendorExpected };
