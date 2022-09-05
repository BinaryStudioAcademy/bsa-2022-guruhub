import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 12,
    lineHeight: 15,
    marginLeft: 3,
  },
});

export { styles };
