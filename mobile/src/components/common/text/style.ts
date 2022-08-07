import { StyleSheet } from 'react-native';
import { AppColor } from '~/common/enums/ui/app-color.enum';
import { AppFont } from '~/common/enums/ui/app-font.enum';

const styles = StyleSheet.create({
  textGray_400: {
    color: AppColor.TEXT.GRAY_400,
  },
  textGray_200: {
    color: AppColor.TEXT.GRAY_200,
  },
  textGray_100: {
    color: AppColor.TEXT.GRAY_100,
  },
  heading_1: {
    fontFamily: AppFont.INTER_600,
    fontSize: 44,
    lineHeight: 64,
  },
  heading_2: {
    fontFamily: AppFont.INTER_600,
    fontSize: 30,
    lineHeight: 48,
  },
  heading_3: {
    fontFamily: AppFont.INTER_600,
    fontSize: 20,
    lineHeight: 32,
  },
  heading_4: {
    fontFamily: AppFont.INTER_600,
    fontSize: 18,
    lineHeight: 24,
  },
  heading_5: {
    fontFamily: AppFont.INTER_600,
    fontSize: 16,
    lineHeight: 18,
  },
  heading_6: {
    fontFamily: AppFont.INTER_600,
    fontSize: 14,
    lineHeight: 24,
    letterSpacing: 0.75,
    textTransform: 'uppercase',
  },
  subheading: {
    fontFamily: AppFont.INTER_600,
    fontSize: 24,
    lineHeight: 48,
  },
  body: {
    fontFamily: AppFont.INTER_500,
    fontSize: 16,
    lineHeight: 28,
  },
  body_sm: {
    fontFamily: AppFont.INTER_400,
    fontSize: 14,
    lineHeight: 24,
  },
  body_sm_bold: {
    fontFamily: AppFont.INTER_600,
    fontSize: 14,
    lineHeight: 24,
  },
  caption: {
    fontFamily: AppFont.INTER_600,
    fontSize: 12,
    lineHeight: 16,
  },
  quotation: {
    fontFamily: AppFont.INTER_400_ITALIC,
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    fontFamily: AppFont.INTER_600,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  button_sm: {
    fontFamily: AppFont.INTER_600,
    fontSize: 16,
    lineHeight: 16,
    letterSpacing: 0.5,
  },
  input_label: {
    fontFamily: AppFont.INTER_500,
    fontSize: 14,
    lineHeight: 16,
  },
  input: {
    fontFamily: AppFont.INTER_600,
    fontSize: 15,
    lineHeight: 24,
  },
});

export { styles };
