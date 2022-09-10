import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    flexDirection: 'row',
  },
  indexWrapper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  index: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    lineHeight: 18,
  },
  textWrapper: {
    marginLeft: 14,
    paddingRight: 20,
  },
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    lineHeight: 18,
    marginBottom: 7,
  },
  description: {
    fontFamily: AppFontFamily.INTER_400,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 14,
    lineHeight: 19,
  },
});

export { styles };
