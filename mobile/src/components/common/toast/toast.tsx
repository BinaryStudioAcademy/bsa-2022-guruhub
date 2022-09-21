import React, { FC } from 'react';
import UIToast, {
  BaseToast,
  ErrorToast,
  InfoToast,
  ToastConfig,
} from 'react-native-toast-message';

import { NotificationType } from '~/common/enums/enums';

import { styles } from './styles';

const toastConfig: ToastConfig = {
  [NotificationType.SUCCESS]: (props) => (
    <BaseToast
      {...props}
      style={styles.success}
      text1Style={styles.text1}
      text2Style={[styles.text2, styles.successText2]}
      text2NumberOfLines={5}
    />
  ),

  [NotificationType.ERROR]: (props) => (
    <ErrorToast
      {...props}
      style={styles.error}
      text1Style={styles.text1}
      text2Style={[styles.text2, styles.errorText2]}
      text2NumberOfLines={5}
    />
  ),

  [NotificationType.INFO]: (props) => (
    <InfoToast
      {...props}
      style={styles.info}
      text1Style={styles.text1}
      text2Style={[styles.text2, styles.infoText2]}
      text2NumberOfLines={5}
    />
  ),
};

const Toast: FC = () => {
  return <UIToast config={toastConfig} />;
};

export { Toast };
