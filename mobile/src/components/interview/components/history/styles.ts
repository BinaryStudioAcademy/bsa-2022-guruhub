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
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    width: 120,
    height: 40,
  },
});

export { styles };
