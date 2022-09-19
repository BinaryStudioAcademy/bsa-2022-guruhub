import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    height: '100%',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 25,
  },
  title: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 20,
    lineHeight: 32,
    marginBottom: 15,
  },
  avatarSection: {
    alignItems: 'center',
    flexDirection: 'row',
    minHeight: 136,
    marginBottom: 20,
  },
  avatar: {
    width: 136,
    height: 136,
    marginRight: 20,
    borderRadius: 68,
  },
  buttons: {
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  button: {
    minWidth: 120,
  },
});

export { styles };
