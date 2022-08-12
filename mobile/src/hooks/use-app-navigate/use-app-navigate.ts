import { useNavigation } from '@react-navigation/native';

import { NavigationScreenProps } from '~/common/types/types';

const useAppNavigate = <T extends NavigationScreenProps>(): T['navigation'] => {
  return useNavigation<T['navigation']>();
};

export { useAppNavigate };
