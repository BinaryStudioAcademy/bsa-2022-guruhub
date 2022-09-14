import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

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
    marginLeft: 15,
    fontSize: 16,
    color: 'white',
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
