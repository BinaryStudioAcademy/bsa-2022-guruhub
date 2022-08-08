import Toast from 'react-native-toast-message';
import { NotificationType } from '~/common/enums/enums';

class Notification {
  error(message: string): void {
    return Toast.show({
      type: NotificationType.ERROR,
      text1: 'Error',
      text2: message,
    });
  }
  info(message: string): void {
    return Toast.show({
      type: NotificationType.INFO,
      text1: 'Informatiom',
      text2: message,
    });
  }
  success(message: string): void {
    return Toast.show({
      type: NotificationType.SUCCESS,
      text1: 'Success!',
      text2: message,
    });
  }
}

export { Notification };
