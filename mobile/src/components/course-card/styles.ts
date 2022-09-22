import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 11,
    marginBottom: 16,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  innerContainer: {
    paddingHorizontal: 6,
  },
  imageContainer: {
    width: '100%',
    height: 135,
  },
  courseImage: {
    width: '100%',
    height: 135,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  title: {
    marginVertical: 6,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    color: AppColor.TEXT.GRAY_100,
  },
  priceWrapper: {
    paddingVertical: 8,
    borderTopWidth: 2,
    borderTopColor: AppColor.BACKGROUND.GRAY_200,
    marginTop: 15,
  },
  price: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    alignSelf: 'flex-end',
  },
});

export { styles };
