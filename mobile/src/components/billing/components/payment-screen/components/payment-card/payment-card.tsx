import { CardField } from '@stripe/stripe-react-native';
import React, { FC } from 'react';

import { CARD_NUMBER_PLACEHOLDER } from '~/components/billing/components/payment-screen/common/constants';
import { Button, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  onPayPress: () => void;
};

const PaymentCard: FC<Props> = ({ onPayPress }) => {
  return (
    <View style={styles.container}>
      <CardField
        postalCodeEnabled={false}
        placeholders={CARD_NUMBER_PLACEHOLDER}
        cardStyle={styles.cardStyle}
        style={styles.cardWrapper}
      />
      <View style={styles.buttonWrapper}>
        <Button onPress={onPayPress} label="Pay" />
      </View>
    </View>
  );
};

export { PaymentCard };
