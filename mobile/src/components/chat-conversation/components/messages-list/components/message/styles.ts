import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  userMessageText: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    lineHeight: 20,
    color: AppColor.TEXT.GRAY_100,
    padding: 12,
    borderRadius: 10,
    borderTopRightRadius: 0,
    backgroundColor: AppColor.BRAND.BLUE_100,
    marginBottom: 5,
  },
  message: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    maxWidth: '100%',
  },
  messageOpponent: {
    paddingRight: 48,
    justifyContent: 'flex-start',
  },
  opponentMessageText: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    lineHeight: 20,
    color: AppColor.TEXT.GRAY_100,
    padding: 12,
    borderRadius: 10,
    borderTopLeftRadius: 0,
    backgroundColor: AppColor.BACKGROUND.GRAY_200,
    marginBottom: 5,
  },
  opponentMessageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 14,
    marginRight: 16,
  },
  userMessageTime: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 10,
    lineHeight: 14,
    alignSelf: 'flex-end',
    color: AppColor.TEXT.GRAY_200,
  },
  opponentMessageTime: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 10,
    lineHeight: 14,
    alignSelf: 'flex-start',
    color: AppColor.TEXT.GRAY_200,
  },
});

export { styles };
