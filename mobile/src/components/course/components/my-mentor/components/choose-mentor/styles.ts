import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingBottom: 0,

    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    color: 'white',
    textAlign: 'left',
  },
  searchFieldContainer: {
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    paddingVertical: 15,
  },
  noMentors: {
    fontSize: 24,
    fontFamily: AppFontFamily.INTER_400_ITALIC,
    color: AppColor.TEXT.GRAY_200,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 150,
  },
  spinnerContainer: {
    flex: 1,
  },
  isMentorChoosingEnabled: {
    marginTop: 20,
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
});

export { styles };
