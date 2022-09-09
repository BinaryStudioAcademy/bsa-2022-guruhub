import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  title: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 20,
  },
  h1: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 10,
  },
  h2: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 18,
    lineHeight: 24,
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 30,
  },
  text: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    lineHeight: 19.5,
  },
  currentCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  categoryWrapper: {
    borderWidth: 1,
    borderColor: AppColor.BRAND.BLUE_100,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  editIconContainer: {
    marginTop: 10,
    marginRight: 10,
  },
});

export { styles };
