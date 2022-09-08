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
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
  },
  date: {
    marginTop: 10,
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
    width: 30,
    height: 30,
    marginRight: 15,
  },
  name: {
    color: '#C4C4C4',
  },
  footerContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
  },
});

export { styles };
