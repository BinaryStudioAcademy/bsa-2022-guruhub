import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

import { iconMargin } from './common/constants/icon.constants';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  tableContainer: {
    maxHeight: '100%',
    marginBottom: 20,
    paddingBottom: 10,
    paddingHorizontal: 15,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 6,
  },
  tableTitle: {
    fontFamily: AppFontFamily.INTER_600,
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    marginVertical: 20,
  },
  tableWrapper: {
    flexDirection: 'row',
  },
  actionWrapper: {
    width: 30,
    height: 30,
    marginHorizontal: 10,
    justifyContent: 'center',
  },
  iconMargin: {
    margin: iconMargin,
  },
});

export { styles };
