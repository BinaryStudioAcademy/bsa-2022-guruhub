import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: AppColor.BACKGROUND.GRAY_200,
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 14,
  },

  search: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 17,
    lineHeight: 22,
  },
});

export { styles };
