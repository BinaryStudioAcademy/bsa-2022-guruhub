import { AppRoute } from 'common/enums/enums';
import { SettingsMenuItem } from 'common/types/types';

const settingsTabs: SettingsMenuItem[] = [
  {
    name: 'Appearance',
    href: AppRoute.SETTINGS_APPEARANCE,
    iconColorClass: 'brandBlue100',
  },
  {
    name: 'Personal information',
    href: AppRoute.SETTINGS_PROFILE,
    iconColorClass: 'supportInfoBlue100',
  },
  {
    name: 'Security',
    href: AppRoute.SETTINGS_SECURITY,
    iconColorClass: 'brandPink100',
  },
  {
    name: 'Billing information',
    href: AppRoute.SETTINGS_BILLING,
    iconColorClass: 'brandGreen100',
  },
  {
    name: 'Messages',
    href: AppRoute.SETTINGS_MESSAGES,
    iconColorClass: 'brandYellow200',
  },
];

export { settingsTabs };
