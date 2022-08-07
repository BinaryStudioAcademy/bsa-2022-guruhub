import { StyleSheet } from '~/components/common/common';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255, .12)',
  },
  list: {
    alignItems: 'flex-start',
    padding: 30,
  },
  listTitle: {
    color: '#6B6D7F',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 10,
    marginLeft: 10,
  },
  listItem: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 54,
    minWidth: 225,
    marginBottom: 10,
    paddingHorizontal: 25,
    // backgroundColor: '#2563EB',
    borderRadius: 27,
  },
  listItemText: {
    color: '#6B6D7F',
    // color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  listBorder: {
    width: '62.5%',
    height: 2,
    marginVertical: 30,
    backgroundColor: '#1E1E2C',
  },
  footer: {
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    height: 140,
    marginTop: 130,
    marginBottom: 30,
    marginHorizontal: 24,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#1E1E2C',
    borderRadius: 14,
  },
  button: {
    justifyContent: 'center',
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: '#2563EB',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
});

export { styles };
