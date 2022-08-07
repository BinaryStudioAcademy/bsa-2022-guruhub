import { StyleSheet } from '~/components/common/common';
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
    alignItems: 'flex-start',
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
    alignItems: 'center',
    flexDirection: 'row',
    height: 54,
    minWidth: 225,
    marginBottom: 10,
    paddingHorizontal: 25,
    // backgroundColor: is focused '#2563EB',
    borderRadius: 27,
  },
  listItemText: {
    color: AppColor.TEXT.GRAY_200,
    // color: is focused '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  listBorder: {
    width: '62.5%',
    height: 2,
    marginVertical: 30,
    backgroundColor: AppColor.BACKGROUND.GRAY_400,
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
