import { StyleSheet } from 'react-native';
import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 30,
    lineHeight: 48,
    paddingTop: 20,
    paddingBottom: 20,
  },
  inputWrapper: {
    marginBottom: 15,
  },
});

export { styles };
