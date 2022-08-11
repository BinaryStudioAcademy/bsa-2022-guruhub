import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  list: {
    padding: 30,
  },
  listTitle: {
    color: AppColor.TEXT.GRAY_200,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 10,
  },
});

export { styles };
