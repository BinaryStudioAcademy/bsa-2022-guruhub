import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    borderRadius: 50,
    marginHorizontal: 50,
    overflow: 'hidden',
  },
  avatar: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  avatarContainer: {
    marginVertical: 16,
    backgroundColor: AppColor.BACKGROUND.GRAY_300,
    justifyContent: 'center',
    height: 200,
    alignItems: 'center',
  },
  fullName: {
    color: AppColor.TEXT.GRAY_100,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '600',
  },
  fullNameContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export { styles };
