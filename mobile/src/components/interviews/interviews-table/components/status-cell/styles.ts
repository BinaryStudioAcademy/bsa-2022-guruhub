import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  statusCell: {
    color: AppColor.TEXT.GRAY_100,
    paddingHorizontal: 8,
    marginHorizontal: 24,
    paddingVertical: 7,
    marginVertical: 5,
    borderRadius: 16,
    borderWidth: 1,
    textAlign: 'center',
  },
});

export { styles };
