import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',

    minWidth: 225,
    height: 54,
    marginBottom: 5,
    paddingHorizontal: 25,
    borderRadius: 27,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
  iconContainer: {
    marginRight: 12,
  },
});

export { styles };
