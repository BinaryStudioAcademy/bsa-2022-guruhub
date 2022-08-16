import { Theme } from '@react-navigation/native';

import { AppColor } from '~/common/enums/enums';

const navigationTheme: Theme = {
  dark: false,
  colors: {
    background: AppColor.BACKGROUND.GRAY_400,
    primary: AppColor.BRAND.BLUE_100,
    text: AppColor.TEXT.GRAY_100,
    border: AppColor.BACKGROUND.GRAY_200,
    card: AppColor.BACKGROUND.GRAY_100,
    notification: AppColor.BACKGROUND.GRAY_300,
  },
};

export { navigationTheme };
