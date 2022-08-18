import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
  },
  textCount: {
    fontSize: 14,
    color: 'white',
    marginHorizontal: 5,
  },
  back: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    transform: [{ rotate: '-45deg' }],
  },
  next: {
    width: 10,
    height: 10,
    borderRightWidth: 2,
    borderTopWidth: 2,
    transform: [{ rotate: '45deg' }],
  },
  disabled: {
    borderColor: AppColor.TEXT.GRAY_200,
  },
  enabled: {
    borderColor: 'white',
  },
});

export { styles };
