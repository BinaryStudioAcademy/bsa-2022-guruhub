import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_200,
    textColor: AppColor.TEXT.GRAY_100,
    placeholderColor: AppColor.BRAND.BLUE_100,
    borderRadius: 8,
    fontFamily: AppFontFamily.INTER_400,
  },
  cardWrapper: {
    width: '100%',
    height: 50,
    marginBottom: 30,
  },
  container: {
    alignItems: 'center',
    margin: 20,
    justifyContent: 'center',
  },
  buttonWrapper: {
    minWidth: 180,
  },
});

export { styles };
