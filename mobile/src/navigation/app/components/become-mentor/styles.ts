import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
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
    width: 219,
    height: 182,
  },
});

export { styles };
