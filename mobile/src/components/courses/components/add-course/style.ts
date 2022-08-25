import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
    padding: 16,
  },
  text: {
    marginBottom: 20,
    fontSize: 20,
    color: 'white',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export { styles };
