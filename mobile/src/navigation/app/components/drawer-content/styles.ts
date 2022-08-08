import { StyleSheet } from 'react-native';
import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  drawerContainer: {
    paddingTop: 0,
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
  button: {
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: AppColor.BRAND.BLUE_100,
    borderRadius: 20,
  },
  buttonText: {
    color: AppColor.TEXT.GRAY_100,
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export { styles };
