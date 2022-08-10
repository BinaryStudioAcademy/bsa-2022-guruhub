import { NotificationType } from 'common/enums/enums';

type NotificationPayload = {
  type: NotificationType;
  message: string;
};

export { type NotificationPayload };
