import { CardField, useStripe } from '@stripe/stripe-react-native';
import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { BillingReplenishToken } from '~/common/types/types';
import { ReplenishAmount } from '~/components/billing/types/types';
import { Button, ScrollView, Text, View } from '~/components/common/common';
import { useState } from '~/hooks/hooks';

import { ReplenishCard } from './components/components';
import { styles } from './styles';

type Props = {
  replenishKey: string;
  replenishingPricesDtos: readonly ReplenishAmount[];
  moneyBalance: number;
  onReplenish: (
    amountOfMoneyToReplenish: number,
    token: BillingReplenishToken,
  ) => void;
  onWithdraw: () => void;
};

const PaymentScreen: FC<Props> = ({
  replenishingPricesDtos,
  moneyBalance,
  onReplenish,
  onWithdraw,
}) => {
  const userMoneyBalance = `$${moneyBalance}`;
  const { createToken } = useStripe();
  const [selectedCardId, setSelectedCardId] = useState<number | null>(null);

  const handleReplenishCardChoose = (cardId: number): void => {
    const selectedCard = selectedCardId !== cardId ? cardId : null;

    setSelectedCardId(selectedCard);
  };

  const handlePayPress = async (): Promise<void> => {
    const { token: createdToken } = await createToken({
      type: 'Card',
      currency: 'USD',
    });
    const amountOfMoneyToReplenish = replenishingPricesDtos.find(
      (dto) => dto.id === selectedCardId,
    );

    if (createdToken && amountOfMoneyToReplenish) {
      onReplenish(amountOfMoneyToReplenish.value * 100, createdToken);
    }

    return;
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.balanceAmount}>{userMoneyBalance}</Text>
        <Text style={styles.balanceText}>Current balance</Text>
        <View style={styles.buttonWrapper}>
          <Button label="Withdraw" onPress={onWithdraw} />
        </View>
      </View>
      <View style={styles.cardsContainer}>
        {replenishingPricesDtos.map((dto) => {
          return (
            <ReplenishCard
              key={dto.id}
              id={dto.id}
              selectedCardId={selectedCardId}
              amount={dto.value}
              onCardChoose={(): void => handleReplenishCardChoose(dto.id)}
            />
          );
        })}
      </View>
      {selectedCardId && (
        <View style={styles.container}>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={{
              backgroundColor: AppColor.BACKGROUND.GRAY_200,
              textColor: AppColor.TEXT.GRAY_100,
              placeholderColor: AppColor.BRAND.BLUE_100,
              borderRadius: 8,
            }}
            style={{
              width: '100%',
              height: 50,
              marginBottom: 30,
            }}
          />
          <View style={styles.buttonWrapper}>
            <Button onPress={handlePayPress} label="Pay" />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export { PaymentScreen };
