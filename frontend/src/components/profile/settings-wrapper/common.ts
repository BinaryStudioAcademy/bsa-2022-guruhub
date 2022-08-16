import { SettingsWrapperType } from 'common/enums/enums';
import { SettingsMenuItem } from 'common/types/types';

const settingsTabs: SettingsMenuItem[] = [
  {
    name: 'Appearance',
    key: SettingsWrapperType.APPEARANCE,
    iconColorClass: 'brandBlue100',
  },
  {
    name: 'Personal information',
    key: SettingsWrapperType.PERSONAL_INFORMATION,
    iconColorClass: 'supportInfoBlue100',
  },
  {
    name: 'Security',
    key: SettingsWrapperType.SECURITY,
    iconColorClass: 'brandPink100',
  },
  {
    name: 'Billing information',
    key: SettingsWrapperType.BILLING,
    iconColorClass: 'brandGreen100',
  },
  {
    name: 'Messages',
    key: SettingsWrapperType.MESSAGES,
    iconColorClass: 'brandYellow200',
  },
];

export { settingsTabs };
