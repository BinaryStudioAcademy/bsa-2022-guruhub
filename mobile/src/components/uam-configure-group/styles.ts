import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    marginTop: 32,
    color: 'white',
    fontSize: 14,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'space-around',
  },
  inputContainer: {
    marginBottom: 16,
  },
});

export { styles };
