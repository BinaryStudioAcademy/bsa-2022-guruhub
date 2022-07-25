import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';

type NavigationScreenProps = {
  navigation: NavigationProp<ParamListBase>;
  route: RouteProp<ParamListBase>;
};

export { type NavigationScreenProps };
