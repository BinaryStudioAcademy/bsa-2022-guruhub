import React, { FC } from 'react';

import { ButtonVariant } from '~/common/enums/enums';
import { Button, ScrollView, Text, View } from '~/components/common/common';

import { styles } from './styles';

const History: FC = () => {
  const handleAdd = (): void => {
    // add
  };

  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>History</Text>
        <Button
          label="Add"
          variant={ButtonVariant.SECONDARY}
          onPress={handleAdd}
          size="small"
          icon="plus"
        />
      </View>
    </ScrollView>
  );
};

export { History };
