import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    width: 64,
    height: 31,
    backgroundColor: 'white',

    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,

    position: 'absolute',
    left: 0,
    top: 31,
    zIndex: 1,
  },
  logo: {
    width: '100%',
    height: 13,
    resizeMode: 'contain',
  },
});

export { styles };
