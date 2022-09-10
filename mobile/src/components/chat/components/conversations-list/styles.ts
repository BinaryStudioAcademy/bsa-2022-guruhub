import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  noMessages: {
    fontSize: 24,
    fontFamily: AppFontFamily.INTER_400_ITALIC,
    color: AppColor.TEXT.GRAY_200,
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20,
    marginTop: 150,
  },
  title: {
    marginBottom: 10,
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    lineHeight: 32,
  },
});

export { styles };
