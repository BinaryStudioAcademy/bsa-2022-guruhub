import { useStripe } from '@stripe/stripe-react-native';
import React, { FC } from 'react';

import { BillingReplenishToken } from '~/common/types/types';
import { ReplenishAmount } from '~/components/billing/types/types';
import { Button, ScrollView, Text, View } from '~/components/common/common';
import { useState } from '~/hooks/hooks';

import { PaymentCard, ReplenishCard } from './components/components';
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
    const newSelectedCardId = selectedCardId !== cardId ? cardId : null;

    setSelectedCardId(newSelectedCardId);
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
      onReplenish(amountOfMoneyToReplenish.value, createdToken);
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
      {selectedCardId && <PaymentCard onPayPress={handlePayPress} />}
    </ScrollView>
  );
};

export { PaymentScreen };
