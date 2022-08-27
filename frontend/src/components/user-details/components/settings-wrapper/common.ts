import { AppRoute } from 'common/enums/enums';
import { SettingsMenuItem } from 'common/types/types';

const settingsTabs: SettingsMenuItem[] = [
  {
    name: 'Appearance',
    href: AppRoute.APPEARANCE,
    iconColorClass: 'brandBlue100',
  },
  {
    name: 'Personal information',
    href: AppRoute.SETTINGS_PROFILE,
    iconColorClass: 'supportInfoBlue100',
  },
  {
    name: 'Security',
    href: AppRoute.SECURITY,
    iconColorClass: 'brandPink100',
  },
  {
    name: 'Billing information',
    href: AppRoute.BILLING,
    iconColorClass: 'brandGreen100',
  },
  {
    name: 'Messages',
    href: AppRoute.MESSAGES,
    iconColorClass: 'brandYellow200',
  },
];

export { settingsTabs };
