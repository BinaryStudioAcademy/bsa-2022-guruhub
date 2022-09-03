import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    padding: 20,
    borderRadius: 10,
  },
  note: {
    color: 'white',
    fontSize: 16,
  },
  date: {
    color: AppColor.TEXT.GRAY_200,
  },
  textContainer: {
    marginTop: 10,
    justifyContent: 'space-between',
  },
  user: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  name: {
    color: '#C4C4C4',
  },
});

export { styles };
