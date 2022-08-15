import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  list: {
    padding: 30,
  },
  listTitle: {
    fontFamily: AppFontFamily.INTER_500,
    color: AppColor.TEXT.GRAY_200,
    fontSize: 16,
    marginBottom: 10,
    marginLeft: 10,
  },
});

export { styles };
