import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, .12)',
  },
  logo: {
    height: 34,
    width: 150,
  },
  listWrapper: {
    alignItems: 'flex-start',
  },
  listBorder: {
    width: '60%',
    height: 2,
    marginLeft: 40,
    marginBottom: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  signInWrapper: {
    padding: 30,
  },
  signInText: {
    padding: 30,
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.BRAND.BLUE_100,
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
  },
});

export { styles };
