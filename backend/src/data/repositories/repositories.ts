import { User as UserModel, Vendor as VendorModel } from '~/data/models/models';
import { User } from './user/user.repository';
import { Vendor } from './vendor/vendor.repository';

const user = new User({
  UserModel,
});

const vendor = new Vendor({
  VendorModel,
});

export { user, vendor };
