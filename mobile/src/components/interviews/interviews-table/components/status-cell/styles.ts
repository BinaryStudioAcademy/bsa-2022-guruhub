import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  statusCellWrapper: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  statusCell: {
    color: AppColor.TEXT.GRAY_100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 16,
    borderWidth: 1,
    textAlign: 'center',
  },
});

export { styles };
