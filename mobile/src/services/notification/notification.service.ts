import Toast from 'react-native-toast-message';

import { NotificationType, NotificationTitle } from '~/common/enums/enums';
import { ShowNotificationType } from '~/common/types/types';

class Notification {
  public [NotificationType.ERROR](message: string): void {
    this.showNotification({
      type: NotificationType.ERROR,
      title: NotificationTitle.ERROR,
      message,
    });
  }

  public [NotificationType.INFO](message: string): void {
    this.showNotification({
      type: NotificationType.INFO,
      title: NotificationTitle.INFO,
      message,
    });
  }

  public [NotificationType.SUCCESS](message: string): void {
    this.showNotification({
      type: NotificationType.SUCCESS,
      title: NotificationTitle.SUCCESS,
      message,
    });
  }

  private showNotification(props: ShowNotificationType): void {
    Toast.show({
      type: props.type,
      text1: props.title,
      text2: props.message,
    });
  }
}

export { Notification };
