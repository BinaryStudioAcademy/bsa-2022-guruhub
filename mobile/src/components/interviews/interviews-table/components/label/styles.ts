import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  label: {
    color: AppColor.TEXT.GRAY_100,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    paddingVertical: 3,
    marginVertical: 3,
    borderRadius: 16,
    borderWidth: 1,
    textAlign: 'center',
  },
});

export { styles };
