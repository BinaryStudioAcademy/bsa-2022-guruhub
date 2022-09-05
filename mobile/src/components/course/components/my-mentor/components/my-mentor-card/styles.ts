import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 12,
  },
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 65,
  },
  avatarContainer: {
    marginRight: 20,
  },
  fullName: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    marginBottom: 10,
  },
  email: {
    fontFamily: AppFontFamily.INTER_500,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 14,
  },
  dataWrapper: {
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: AppColor.BACKGROUND.GRAY_200,
    alignItems: 'center',
  },
  buttonWrapper: {
    paddingTop: 16,
    alignItems: 'flex-end',
  },
});

export { styles };
