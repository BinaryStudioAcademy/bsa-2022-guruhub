import { AppColor, ButtonVariant } from '~/common/enums/enums';

const theme = {
  [ButtonVariant.PRIMARY]: {
    text: {
      color: AppColor.TEXT.GRAY_100,
    },
    button: {
      backgroundColor: AppColor.BRAND.BLUE_100,
    },
  },
  [ButtonVariant.SECONDARY]: {
    text: {
      color: AppColor.BRAND.BLUE_100,
    },
    button: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: AppColor.BRAND.BLUE_100,
    },
  },
};

export { theme };
