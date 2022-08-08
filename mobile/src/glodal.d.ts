import { RootNavigationParamList } from './common/types/types';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootNavigationParamList {}
  }
}
