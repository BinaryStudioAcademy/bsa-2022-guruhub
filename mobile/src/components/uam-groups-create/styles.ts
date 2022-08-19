import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flex: 1,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  title: {
    marginBottom: 16,
    marginTop: 32,
    color: 'white',
    fontSize: 14,
  },
  buttonsContainer: {
    margin: 16,
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
});

export { styles };
