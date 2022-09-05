import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  container: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  courseTitle: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 24,
    lineHeight: 34,
    paddingBottom: 20,
  },
  moduleTitle: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 7,
  },
  description: {
    fontFamily: AppFontFamily.INTER_400,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 14,
    lineHeight: 24,
  },
});

export { styles };
