import { DrawerNavigationOptions } from '@react-navigation/drawer';
import { AppColor } from '~/common/enums/enums';

const SCREEN_OPTIONS: DrawerNavigationOptions = {
  swipeEdgeWidth: 100,
  headerStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  headerTintColor: AppColor.TEXT.GRAY_100,
  headerTitleStyle: {
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.5,
  },
  drawerStyle: {
    width: '90%',
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
};

export { SCREEN_OPTIONS };
