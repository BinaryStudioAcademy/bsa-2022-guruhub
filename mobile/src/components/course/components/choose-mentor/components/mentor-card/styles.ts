import { StyleSheet } from 'react-native';

import { AppColor } from '~/common/enums/enums';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: AppColor.BACKGROUND.GRAY_100,
    borderRadius: 12,
    marginHorizontal: 20,
    overflow: 'hidden',
  },
  avatar: {
    height: '100%',
  },
  avatarContainer: {
    width: '100%',
    height: 255,
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
  circle: {
    marginRight: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: AppColor.SUPPORT.INFO_BLUE_100,
  },
  buttonContainer: {
    marginBottom: 26,
    width: 210,
    alignSelf: 'center',
  },
});

export { styles };
