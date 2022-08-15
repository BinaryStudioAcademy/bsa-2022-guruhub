import { StyleSheet } from 'react-native';

import { AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',

    minWidth: 225,
    height: 54,
    marginBottom: 5,
    paddingHorizontal: 25,
    borderRadius: 27,
  },
  label: {
    fontFamily: AppFontFamily.INTER_500,
    fontSize: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
});

export { styles };
