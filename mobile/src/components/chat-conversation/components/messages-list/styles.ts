import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  messageList: {
    minWidth: '100%',
    padding: 16,
    flexDirection: 'column-reverse',
  },
  messageSeparator: {
    marginTop: 12,
  },
});

export { styles };
