import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  noCourses: {
    fontSize: 24,
    fontFamily: AppFontFamily.INTER_400_ITALIC,
    color: AppColor.TEXT.GRAY_200,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 170,
  },
  paginationContainer: {
    paddingTop: 16,
  },
});

export { styles };
