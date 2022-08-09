import { NotificationType } from '~/common/enums/enums';

type ShowNotificationParams = {
  type: NotificationType;
  title: string;
  message: string;
};

export { type ShowNotificationParams };
