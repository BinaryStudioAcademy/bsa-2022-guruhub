import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    paddingLeft: 5,
    paddingRight: 10,
    backgroundColor: AppColor.TEXT.GRAY_100,
    shadowColor: AppColor.BRAND.BLUE_100,
    elevation: 10,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  text: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_400,
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 3,
  },
});

export { styles };
