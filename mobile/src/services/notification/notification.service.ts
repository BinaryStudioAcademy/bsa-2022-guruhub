import Toast from 'react-native-toast-message';

import { NotificationType } from '~/common/enums/enums';

class Notification {
  private showNotification(type: NotificationType, message: string): void {
    Toast.show({
      type: type,
      text1: 'Error',
      text2: message,
    });
  }

  public [NotificationType.ERROR](message: string): void {
    this.showNotification(NotificationType.ERROR, message);
  }

  public [NotificationType.INFO](message: string): void {
    this.showNotification(NotificationType.INFO, message);
  }

  public [NotificationType.SUCCESS](message: string): void {
    this.showNotification(NotificationType.INFO, message);
  }
}

export { Notification };
