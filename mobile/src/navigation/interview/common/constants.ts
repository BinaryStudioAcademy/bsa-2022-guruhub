import { MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';

import {
  AppColor,
  AppFontFamily,
  InterviewScreenName,
} from '~/common/enums/enums';
import { InterviewTabItem } from '~/common/types/types';
import {
  Applications,
  Notes,
} from '~/components/interview/components/components';

const SCREEN_OPTIONS: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 14,
    lineHeight: 16,
    letterSpacing: 0.5,
    textTransform: 'none',
  },
  tabBarStyle: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
  },
  tabBarIndicatorStyle: {
    backgroundColor: AppColor.BRAND.BLUE_100,
  },
  swipeEnabled: false,
  tabBarActiveTintColor: AppColor.TEXT.GRAY_100,
  tabBarInactiveTintColor: AppColor.TEXT.GRAY_200,
};

const INTERVIEW_TAB_ITEMS: InterviewTabItem[] = [
  {
    name: InterviewScreenName.APPLICATIONS,
    component: Applications,
  },
  {
    name: InterviewScreenName.NOTES,
    component: Notes,
  },
];

export { INTERVIEW_TAB_ITEMS, SCREEN_OPTIONS };
