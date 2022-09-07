import React, { FC } from 'react';

import { DataStatus, TaskStatus } from '~/common/enums/enums';
import {
  TaskGetItemReponseDto,
  TaskNoteFormRequestDto,
  TaskNoteManipulateRequestBodyDto,
} from '~/common/types/types';
import { ScrollView, Spinner, Text, View } from '~/components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from '~/hooks/hooks';
import { courseModulesActions } from '~/store/actions';

import { TaskNotes } from './components/components';
import { TaskMessageArea } from './components/task-manipulate/components/components';
import { styles } from './styles';

const Task: FC = () => {
  const dispatch = useAppDispatch();
  const { dataStatus, notes, task, isMentor, user, moduleId } = useAppSelector(
    ({ courseModules, auth, courses }) => ({
      dataStatus: courseModules.dataStatus,
      courseModule: courseModules.courseModules,
      notes: courseModules.notes,
      task: courseModules.task,
      isMentor: courses.isMentor,
      user: auth.user,
      courseId: courseModules.module?.courseId,
      moduleId: courseModules.module?.id,
    }),
  );

  const isLoading = dataStatus === DataStatus.PENDING;

  const handleManipulateNote = (
    payload: TaskNoteManipulateRequestBodyDto,
  ): void => {
    dispatch(
      courseModulesActions.createNote({
        body: payload,
        taskId: (task as TaskGetItemReponseDto).id,
      }),
    );
  };

  const handleSendOnReview = (payload: TaskNoteFormRequestDto): void => {
    const { note } = payload;
    handleManipulateNote({ note, status: TaskStatus.PENDING });
  };

  const handleApprove = (payload: TaskNoteFormRequestDto): void => {
    const { note } = payload;
    handleManipulateNote({ note, status: TaskStatus.COMPLETED });
  };

  const handleReject = (payload: TaskNoteFormRequestDto): void => {
    const { note } = payload;
    handleManipulateNote({ note, status: TaskStatus.REJECTED });
  };

  useEffect(() => {
    if (task) {
      dispatch(courseModulesActions.getNotes({ taskId: task.id }));
    }
  }, [task]);

  useEffect(() => {
    if (user && !isMentor && moduleId) {
      dispatch(
        courseModulesActions.getTask({
          menteeId: user.id,
          moduleId: moduleId,
        }),
      );
    }
  }, [user, isMentor, moduleId]);

  if (isLoading) {
    return <Spinner isOverflow />;
  }

  if (!task) {
    return <Text style={styles.noTask}>Task does't exist</Text>;
  }

  return (
    <ScrollView style={styles.wrapper}>
      {user && task && task.status !== TaskStatus.COMPLETED && (
        <View>
          {isMentor ? (
            <TaskMessageArea
              onSubmit={handleApprove}
              onReject={handleReject}
              isMentor={true}
            />
          ) : (
            <TaskMessageArea onSubmit={handleSendOnReview} />
          )}
        </View>
      )}
      <Text style={styles.title}>History</Text>
      {user && task && <TaskNotes notes={notes} />}
    </ScrollView>
  );
};

export { Task };
