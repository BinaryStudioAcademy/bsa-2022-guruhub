import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  button: {
    backgroundColor: AppColor.BRAND.BLUE_100,
    borderRadius: 28,
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
  },
  label: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    lineHeight: 16,
  },
});

export { styles };
