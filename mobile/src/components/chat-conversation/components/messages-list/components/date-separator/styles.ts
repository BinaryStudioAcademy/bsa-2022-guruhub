import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: AppColor.BACKGROUND.GRAY_200,
    alignSelf: 'center',
    marginBottom: 20,
  },
  date: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export { styles };
