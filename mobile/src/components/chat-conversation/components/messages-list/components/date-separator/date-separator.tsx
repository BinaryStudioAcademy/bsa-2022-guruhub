import React, { FC } from 'react';

import { Text, View } from '~/components/common/common';
import {
  checkIsCurrentYear,
  checkIsToday,
  getFormattedDate,
} from '~/helpers/helpers';

import { styles } from './styles';

type Props = {
  messageTime: string;
};

const DateSeparator: FC<Props> = ({ messageTime }) => {
  const messageDate = new Date(messageTime);
  const isToday = checkIsToday(messageDate);
  const isCurrentYear = checkIsCurrentYear(messageDate);

  const dateFormat = isCurrentYear ? 'dd MMM' : 'dd MMM yyyy';

  const date = isToday ? 'Today' : getFormattedDate(messageTime, dateFormat);

  return (
    <View style={styles.container}>
      <Text style={styles.date}>{date}</Text>
    </View>
  );
};

export { DateSeparator };
