import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  isMentorChoosingEnabled: {
    marginTop: 20,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    textAlign: 'center',
  },
});

export { styles };
