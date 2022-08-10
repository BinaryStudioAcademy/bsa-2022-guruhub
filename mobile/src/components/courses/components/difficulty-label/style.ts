import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'baseline',
    height: 29,
    backgroundColor: 'white',
    borderRadius: 12,
    position: 'absolute',
    zIndex: 1,
    left: 10,
    bottom: 10,
  },
  icon: {
    width: 14,
    height: 15,
    resizeMode: 'contain',
  },
  text: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.BACKGROUND.GRAY_400,
    marginRight: 5,
  },
});

export { styles };
