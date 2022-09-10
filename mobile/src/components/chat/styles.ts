import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  noUser: {
    fontSize: 24,
    fontFamily: AppFontFamily.INTER_400_ITALIC,
    color: AppColor.TEXT.GRAY_200,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonWrapper: {
    width: 215,
    alignSelf: 'center',
    marginTop: 10,
  },
});

export { styles };
