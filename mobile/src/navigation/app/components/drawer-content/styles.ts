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
  list: {
    padding: 30,
  },
  listTitle: {
    color: AppColor.TEXT.GRAY_200,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 10,
  },
  listItem: {
    justifyContent: 'center',
    borderRadius: 25,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: -20,
    marginRight: 10,
  },
  listBorder: {
    width: '62.5%',
    height: 2,
    marginTop: 30,
    marginBottom: 40,
    marginLeft: 10,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
  },
  icon: {
    marginVertical: 7,
    marginLeft: 15,
  },
  footer: {
    alignItems: 'flex-start',
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
  },
});

export { styles };
