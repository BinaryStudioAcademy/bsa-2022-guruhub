import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  noStudents: {
    marginLeft: 15,
    fontSize: 16,
    color: AppColor.TEXT.GRAY_100,
  },
});

export { styles };
