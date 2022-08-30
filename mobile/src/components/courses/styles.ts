import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 0,

    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  searchFieldContainer: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    paddingVertical: 15,
  },
  spinnerContainer: {
    flex: 1,
  },
  noCourses: {
    fontSize: 24,
    fontFamily: AppFontFamily.INTER_400_ITALIC,
    color: AppColor.TEXT.GRAY_200,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 150,
  },
});

export { styles };
