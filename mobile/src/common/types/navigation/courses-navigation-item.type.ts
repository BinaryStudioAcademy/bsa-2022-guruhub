import { NativeStackNavigationOptions } from '@react-navigation/native-stack';

import { NavigationItem } from './navigation';

type CoursesNavigationItem = NavigationItem & {
  options?: NativeStackNavigationOptions;
};

export { type CoursesNavigationItem };
