import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 11,
    borderRadius: 20,
  },
  text: {
    color: AppColor.TEXT.GRAY_100,
  },
  rejected: {
    backgroundColor: AppColor.BRAND.PINK_100,
  },
  completed: {
    backgroundColor: AppColor.BRAND.GREEN_100,
  },
  pending: {
    backgroundColor: AppColor.SUPPORT.INFO_BLUE_100,
  },
  uncompleted: {
    backgroundColor: AppColor.TEXT.GRAY_200,
  },
});

export { styles };
