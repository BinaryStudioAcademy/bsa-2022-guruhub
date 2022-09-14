import React, { FC, ReactElement } from 'react';

import { TaskWithModuleResponseDto } from '~/common/types/types';
import { Chip, Content, Text, View } from '~/components/common/common';
import { statusToColor } from '~/components/course/common/maps/status-to-color.map';
import { useWindowDimensions } from '~/hooks/hooks';

import { styles } from './styles';

type Props = {
  index: number;
  title: string;
  description: string | null;
  isMentor: boolean;
  moduleId: number;
  tasks: TaskWithModuleResponseDto[];
};

const Module: FC<Props> = ({
  index,
  title,
  description,
  isMentor,
  moduleId,
  tasks,
}): ReactElement => {
  const { width } = useWindowDimensions();
  const moduleSequenceNumber = `${index + 1}.`;

  const moduleTask = tasks.find((task) => task.moduleId === moduleId);

  return (
    <View style={styles.container}>
      <View style={styles.indexWrapper}>
        <Text style={styles.index}>{moduleSequenceNumber}</Text>
      </View>
      <View style={styles.textWrapper}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>{title}</Text>
          {isMentor && moduleTask && (
            <View style={styles.statusWrapper}>
              <Chip
                text={moduleTask.status}
                color={statusToColor[moduleTask.status]}
              />
            </View>
          )}
        </View>
        {description && (
          <Content
            html={description}
            width={width}
            style={styles.description}
          />
        )}
      </View>
    </View>
  );
};

export { Module };
