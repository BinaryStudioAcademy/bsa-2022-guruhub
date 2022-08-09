import { NotificationType } from '~/common/enums/enums';

type ShowNotificationType = {
  type: NotificationType;
  title: string;
  message: string;
};

export { type ShowNotificationType };
