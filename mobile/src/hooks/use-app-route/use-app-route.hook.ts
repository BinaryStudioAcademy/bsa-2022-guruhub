import { useRoute } from '@react-navigation/native';

import { NavigationScreenProps } from '~/common/types/types';

const useAppRoute = <T extends NavigationScreenProps>(): T['route'] => {
  return useRoute<T['route']>();
};

export { useAppRoute };
