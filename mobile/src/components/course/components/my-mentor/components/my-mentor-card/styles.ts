import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 12,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  avatarContainer: {
    marginRight: 20,
  },
  fullName: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    marginBottom: 20,
  },
  email: {
    fontFamily: AppFontFamily.INTER_500,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 14,
  },
  dataWrapper: {
    flexDirection: 'row',
    paddingBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: AppColor.BACKGROUND.GRAY_200,
    alignItems: 'center',
  },
  buttonWrapper: {
    paddingTop: 20,
    alignItems: 'flex-end',
  },
});

export { styles };
