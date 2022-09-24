import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  cardsContainer: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 30,
  },
  container: {
    alignItems: 'center',
    margin: 20,
    justifyContent: 'center',
  },
  balanceAmount: {
    color: AppColor.BRAND.BLUE_100,
    fontFamily: AppFontFamily.INTER_600,
    fontSize: 40,
  },
  balanceText: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 18,
    marginBottom: 16,
  },
  buttonWrapper: {
    minWidth: 180,
  },
});

export { styles };
