import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootNavigationParamList } from './root-navigation-param-list.type';

type RootNavigationScreenProps<T extends keyof RootNavigationParamList> =
  NativeStackScreenProps<RootNavigationParamList, T>;

export { type RootNavigationScreenProps };
