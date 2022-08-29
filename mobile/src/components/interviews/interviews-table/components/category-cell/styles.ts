import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  categoryCell: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  categoryName: {
    color: AppColor.TEXT.GRAY_100,
    paddingLeft: 5,
  },
});

export { styles };
