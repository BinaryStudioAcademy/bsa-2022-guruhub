import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 12,
  },
  avatarContainer: {},
  avatar: {
    width: 65,
    height: 65,
    borderRadius: 33,
  },
  fullName: {
    color: 'white',
    fontSize: 16,
  },
  fullNameContainer: {
    marginVertical: 20,
    marginLeft: 21,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { styles };
