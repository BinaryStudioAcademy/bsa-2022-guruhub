import Toast from 'react-native-toast-message';
import { NotificationType } from '~/common/enums/enums';

class Notification {
  private [NotificationType.ERROR](message: string): void {
    Toast.show({
      type: NotificationType.ERROR,
      text1: 'Error',
      text2: message,
    });
  }

  private [NotificationType.INFO](message: string): void {
    Toast.show({
      type: NotificationType.INFO,
      text1: 'Information',
      text2: message,
    });
  }

  private [NotificationType.SUCCESS](message: string): void {
    Toast.show({
      type: NotificationType.SUCCESS,
      text1: 'Success!',
      text2: message,
    });
  }
}

export { Notification };
