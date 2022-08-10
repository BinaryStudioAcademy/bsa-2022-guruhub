import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: 83,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: AppColor.BRAND.YELLOW_200,
    borderRadius: 16,
  },
  text: {
    color: AppColor.BACKGROUND.GRAY_400,
    fontSize: 12,
  },
});

export { styles };
