import { SettingsWrapperType } from 'common/enums/enums';
import { SettingsMenuItem } from 'common/types/types';

const settingsTabs: SettingsMenuItem[] = [
  {
    name: 'Appearance',
    tab: SettingsWrapperType.APPEARANCE,
    iconColorClass: 'brandBlue100',
  },
  {
    name: 'Personal information',
    tab: SettingsWrapperType.PERSONAL_INFORMATION,
    iconColorClass: 'supportInfoBlue100',
  },
  {
    name: 'Security',
    tab: SettingsWrapperType.SECURITY,
    iconColorClass: 'brandPink100',
  },
  {
    name: 'Billing information',
    tab: SettingsWrapperType.BILLING,
    iconColorClass: 'brandGreen100',
  },
  {
    name: 'Messages',
    tab: SettingsWrapperType.MESSAGES,
    iconColorClass: 'brandYellow200',
  },
];

export { settingsTabs };
