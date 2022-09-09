import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: AppColor.BACKGROUND.GRAY_200,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  opponentName: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    lineHeight: 18.5,
    color: AppColor.TEXT.GRAY_100,
    marginBottom: 5,
  },
  opponentMessage: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 12,
    lineHeight: 16,
    color: AppColor.TEXT.GRAY_200,
  },
  date: {
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 10,
    lineHeight: 14,
    color: AppColor.TEXT.GRAY_200,
  },
});

export { styles };
