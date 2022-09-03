import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    lineHeight: 32,
  },
  inputContainer: {
    marginTop: 10,
    padding: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 10,
  },
  input: {
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 120,
  },
});

export { styles };
