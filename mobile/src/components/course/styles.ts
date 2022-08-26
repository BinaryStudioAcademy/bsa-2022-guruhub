import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  h1: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 24,
    lineHeight: 32,
    marginBottom: 15,
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
    resizeMode: 'contain',
    borderRadius: 12,
    marginBottom: 30,
  },
  text: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    lineHeight: 19.5,
  },
});

const tagsStyles = {
  li: {
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 5,
  },
};

export { styles, tagsStyles };
