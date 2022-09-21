import React, { FC } from 'react';

import { Pressable, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  id: number;
  selectedCardId: number | null;
  amount: number;
  onCardChoose: () => void;
};

const ReplenishCard: FC<Props> = ({
  id,
  selectedCardId,
  amount,
  onCardChoose,
}) => {
  const amountText = `$${amount}`;

  const isActive = selectedCardId && selectedCardId === id;

  return (
    <Pressable onPress={onCardChoose}>
      <View style={{ ...styles.container, ...(isActive && styles.activeCard) }}>
        <Text style={{ ...styles.title, ...(isActive && styles.activeText) }}>
          {amountText}
        </Text>
      </View>
    </Pressable>
  );
};

export { ReplenishCard };
