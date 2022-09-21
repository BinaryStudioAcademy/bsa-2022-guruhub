import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { NavigationItem } from '~/common/types/types';

type CoursesNavigationItem = NavigationItem & {
  options?: NativeStackNavigationOptions;
};

export { type CoursesNavigationItem };
