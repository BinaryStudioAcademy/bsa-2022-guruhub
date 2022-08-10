import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

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
  search: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    flex: 1,
    fontSize: 17,
    lineHeight: 22,
  },
});

export { styles };
