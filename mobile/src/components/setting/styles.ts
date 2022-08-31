import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 20,
    lineHeight: 32,
    marginBottom: 15,
  },
  avatarSection: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 136,
    marginBottom: 20,
  },
  avatar: {
    width: 136,
    height: 136,
    marginRight: 20,
  },
  inputLabel: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 14,
    lineHeight: 16,
    marginBottom: 10,
  },
  buttons: {
    alignSelf: 'flex-end',
    marginVertical: 20,
  },
  singOutWrapper: {
    width: 215,
    alignSelf: 'center',
  },
});

export { styles };
