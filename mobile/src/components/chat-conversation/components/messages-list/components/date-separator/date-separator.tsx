import React, { FC } from 'react';

import { Text, View } from '~/components/common/common';
import { checkIsToday, getFormattedDate } from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  messageTime: string;
};

const DateSeparator: FC<Props> = ({ messageTime }) => {
  const isToday = checkIsToday(new Date(messageTime));
  const date = isToday ? 'Today' : getFormattedDate(messageTime, 'dd MMM');

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export { DateSeparator };
