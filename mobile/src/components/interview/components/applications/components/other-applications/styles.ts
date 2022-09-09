import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 6,
  },
  title: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 20,
    lineHeight: 32,
    marginVertical: 15,
  },
  noApplications: {
    color: AppColor.TEXT.GRAY_200,
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 16,
    lineHeight: 24,
  },
});

export { styles };
