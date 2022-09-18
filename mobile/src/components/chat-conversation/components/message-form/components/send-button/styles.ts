import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  disabledButton: {
    opacity: 0.5,
  },
  iconShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 5,
    backgroundColor: 'rgba(255,255,255,0.001)',
  },
  icon: {
    position: 'absolute',
    zIndex: 0,
  },
});

export { styles };
