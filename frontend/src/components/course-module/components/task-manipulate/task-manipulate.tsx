import { FC, TaskNoteFormRequestDto } from 'common/types/types';

import { CREATE_NOTE_DEFAULT_VALUES } from './common';
import {
  TaskManipulateMentor,
  TaskManipulateStudent,
} from './components/components';

type Props = {
  onSendOnReview: (payload: TaskNoteFormRequestDto) => void;
  onApprove: (payload: TaskNoteFormRequestDto) => void;
  onReject: (payload: TaskNoteFormRequestDto) => void;
  isMentorView: boolean;
};

const TaskManipulate: FC<Props> = ({
  onSendOnReview,
  onApprove,
  onReject,
  isMentorView,
}) => {
  return (
    <div>
      {isMentorView ? (
        <TaskManipulateMentor
          defaultValues={CREATE_NOTE_DEFAULT_VALUES}
          onApprove={onApprove}
          onReject={onReject}
        />
      ) : (
        <TaskManipulateStudent
          defaultValues={CREATE_NOTE_DEFAULT_VALUES}
          onSubmit={onSendOnReview}
        />
      )}
    </div>
  );
};

export { TaskManipulate };
