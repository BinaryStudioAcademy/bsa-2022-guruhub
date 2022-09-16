import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: AppColor.BACKGROUND.GRAY_200,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'transparent',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 8,
    marginHorizontal: 16,
  },
});

export { styles };
