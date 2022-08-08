import React, { FC } from 'react';
import Toast, {
  BaseToast,
  InfoToast,
  ErrorToast,
  BaseToastProps,
} from 'react-native-toast-message';
import { styles } from './styles';

const toastConfig = {
  success: (props: JSX.IntrinsicAttributes & BaseToastProps): JSX.Element => (
    <BaseToast
      {...props}
      style={styles.success}
      text1Style={styles.text1}
      text2Style={[styles.text2, styles.successText2]}
    />
  ),

  error: (props: JSX.IntrinsicAttributes & BaseToastProps): JSX.Element => (
    <ErrorToast
      {...props}
      style={styles.error}
      text1Style={styles.text1}
      text2Style={[styles.text2, styles.errorText2]}
    />
  ),

  info: (props: JSX.IntrinsicAttributes & BaseToastProps): JSX.Element => (
    <InfoToast
      {...props}
      style={styles.info}
      text1Style={styles.text1}
      text2Style={[styles.text2, styles.infoText2]}
    />
  ),
};

const CustomToast: FC = () => {
  return <Toast config={toastConfig} />;
};

export { CustomToast };
