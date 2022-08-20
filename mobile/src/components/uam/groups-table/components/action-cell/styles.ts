import { StyleSheet } from 'react-native';

import { iconMargin } from '~/components/uam/common/constants/constants';

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    flexDirection: 'row',
  },
  button: {
    marginRight: 15,
  },
  iconMargin: {
    margin: iconMargin,
  },
});

export { styles };
