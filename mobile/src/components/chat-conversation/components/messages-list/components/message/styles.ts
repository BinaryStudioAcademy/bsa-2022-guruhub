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
    marginBottom: 15,
    justifyContent: 'flex-end',
  },
  messageOpponent: {
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
  textWrapper: {
    flex: 1,
  },
  opponentMessageAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 15,
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
