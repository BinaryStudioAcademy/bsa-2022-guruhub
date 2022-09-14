import React, { FC, ReactElement, useEffect } from 'react';

import { AppColor } from '~/common/enums/enums';
import {
  FlatList,
  RefreshControl,
  Text,
  View,
} from '~/components/common/common';
import { useAppDispatch, useAppSelector } from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';
import { getMenteesByCourseId } from '~/store/courses/actions';

import { StudentCard } from './components/components';
import { styles } from './styles';

const CourseStudents: FC = () => {
  const dispatch = useAppDispatch();
  const { mentees, courseId } = useAppSelector(({ courses }) => ({
    mentees: courses.menteesByCourseId,
    courseId: courses.course?.id,
  }));

  const handleMenteesLoad = (): void => {
    if (courseId) {
      dispatch(getMenteesByCourseId({ id: courseId }));
    }
  };

  const handleMenteeSelect = (menteeId: number): void => {
    dispatch(coursesActions.addCurrentMenteeId(menteeId));
  };

  useEffect(() => {
    handleMenteesLoad();
  }, [courseId]);

  return (
    <View style={styles.container}>
      <FlatList
        data={mentees}
        keyExtractor={({ id }): string => id.toString()}
        renderItem={({ item: mentee }): ReactElement => (
          <StudentCard mentee={mentee} onSelect={handleMenteeSelect} />
        )}
        refreshControl={
          <RefreshControl
            colors={[AppColor.BRAND.BLUE_100]}
            refreshing={false}
            onRefresh={handleMenteesLoad}
          />
        }
        ListEmptyComponent={(): ReactElement => (
          <Text style={styles.noStudents}>There are no students yet…</Text>
        )}
      />
    </View>
  );
};

export { CourseStudents };
