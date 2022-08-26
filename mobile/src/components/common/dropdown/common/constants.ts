import { AppColor } from '~/common/enums/enums';

const dropDownSettings = {
  theme: 'DARK',
  closeOnBackPressed: true,
  placeholder: 'Select category',
  placeholderStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  searchPlaceholder: 'Search...',
  maxHeight: 400,
  autoScroll: true,
  labelStyle: {
    fontWeight: 'bold',
  },
  searchable: true,
  schema: {
    label: 'name',
    value: 'id',
  },
  listMode: 'MODAL',
  dropDownContainerStyle: {
    backgroundColor: 'white',
    height: 100,
  },
  listParentContainerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  searchContainerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  searchTextInputStyle: {
    color: 'white',
  },

  searchPlaceholderTextColor: 'white',
};

export { dropDownSettings };
