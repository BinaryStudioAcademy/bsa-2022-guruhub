import { StyleSheet } from 'react-native';

import { AppColor, AppFontFamily } from '~/common/enums/enums';

const styles = StyleSheet.create({
  text: {
    color: AppColor.TEXT.GRAY_100,
    fontFamily: AppFontFamily.INTER_400,
    fontSize: 14,
    lineHeight: 19.5,
  },
});

const defaultTagsStyles = {
  li: {
    marginTop: -15,
    marginBottom: 10,
    marginLeft: 5,
  },
};

export { defaultTagsStyles, styles };
