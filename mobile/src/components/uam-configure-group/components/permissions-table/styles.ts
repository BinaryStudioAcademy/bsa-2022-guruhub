import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  tableContainer: {
    maxHeight: '100%',
    marginBottom: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 6,
  },
});

export { styles };
