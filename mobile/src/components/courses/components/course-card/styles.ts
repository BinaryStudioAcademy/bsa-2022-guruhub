import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 11,
    marginBottom: 16,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 16,
  },
  inner_container: {
    paddingHorizontal: 6,
  },
  pressed: {
    opacity: 0.75,
  },
  imageContainer: {
    width: '100%',
    height: 135,
  },
  course_image: {
    width: '100%',
    height: 135,
    resizeMode: 'contain',
    borderRadius: 12,
  },
  title: {
    marginVertical: 12,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    color: 'white',
  },
  author_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  author_name: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 12,
    color: '#E3E3E3',
  },
  avatar_container: {
    width: 25,
    height: 25,
    marginRight: 8,
    borderRadius: 50,
    backgroundColor: '#C4C4C4',
  },
  rating_container: {
    marginBottom: 17,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating_text: {
    marginRight: 6,
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 12,
  },
  rating_star: {},
  footer: {
    paddingTop: 9,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: AppColor.TEXT.GRAY_200,
  },
  footer_bestseller: {
    width: 79,
    height: 25,
  },
  footer_price: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 16,
    color: 'white',
  },
});

export { styles };
