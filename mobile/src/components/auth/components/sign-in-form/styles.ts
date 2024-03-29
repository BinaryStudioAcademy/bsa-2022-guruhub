import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 30,
    lineHeight: 48,
    paddingTop: 20,
    paddingBottom: 20,
  },
  buttonWrapper: {
    width: 215,
    alignSelf: 'center',
    marginTop: 25,
  },
  linkWrapper: {
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
});

export { styles };
