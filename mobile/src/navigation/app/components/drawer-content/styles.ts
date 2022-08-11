import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, .12)',
  },
  logo: {
    height: 34,
    width: 150,
  },
  listWrapper: {
    alignItems: 'flex-start',
  },
  listBorder: {
    width: '60%',
    height: 2,
    marginLeft: 40,
    marginBottom: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: 140,
    marginTop: 130,
    marginBottom: 30,
    marginHorizontal: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
    borderRadius: 14,
  },
  footerImage: {
    marginLeft: 20,
    marginBottom: 10,
    resizeMode: 'contain',
    width: 219,
    height: 182,
  },
});

export { styles };
