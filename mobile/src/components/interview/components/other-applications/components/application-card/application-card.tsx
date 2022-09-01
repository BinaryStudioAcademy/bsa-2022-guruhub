import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import {
  InterviewsByIdRequestParamsDto,
  InterviewsByIdResponseDto,
} from '~/common/types/types';
import { Pressable, StatusCell, Text, View } from '~/components/common/common';

import { styles } from './styles';

type Props = {
  interview: InterviewsByIdResponseDto;
  onCardPress: (id: InterviewsByIdRequestParamsDto) => void;
};

const ApplicationCard: FC<Props> = ({ interview, onCardPress }) => {
  const { id, status, courseCategory, interviewer, interviewee } = interview;
  const interviewerName =
    interviewer?.userDetails.fullName ?? 'Not assigned yet';
  const intervieweeName = interviewee.userDetails.fullName;
  const direction = courseCategory.name;

  const handlePostExpand = (): void => onCardPress({ id });

  return (
    <Pressable style={styles.card} onPress={handlePostExpand}>
      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Text style={styles.title}>ID</Text>
        </View>
        <View style={styles.colRight}>
          <Text style={styles.text}>{id.toString()}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Text style={styles.title}>Direction</Text>
        </View>
        <View style={styles.colRight}>
          <Text style={styles.text}>{direction}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Text style={styles.title}>Status</Text>
        </View>
        <View style={styles.colRight}>
          <StatusCell text={status} color={AppColor.BRAND.PINK_100} />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Text style={styles.title}>Interviewer</Text>
        </View>
        <View style={styles.colRight}>
          <Text style={styles.text}>{interviewerName}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.colLeft}>
          <Text style={styles.title}>Interviewee</Text>
        </View>
        <View style={styles.colRight}>
          <Text style={styles.text}>{intervieweeName}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export { ApplicationCard };
