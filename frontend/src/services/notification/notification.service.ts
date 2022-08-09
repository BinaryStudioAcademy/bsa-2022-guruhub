import { NotificationType } from 'common/enums/enums';
import { toast } from 'react-toastify';

const DEFAULT_MESSAGE = 'Unexpected error';

class Notification {
  public [NotificationType.ERROR](message = DEFAULT_MESSAGE): void {
    toast.error(message);
  }

  public [NotificationType.SUCCESS](message = DEFAULT_MESSAGE): void {
    toast.success(message);
  }

  public [NotificationType.WARNING](message = DEFAULT_MESSAGE): void {
    toast.warn(message);
  }

  public [NotificationType.INFO](message = DEFAULT_MESSAGE): void {
    toast.info(message);
  }
}

export { Notification };
