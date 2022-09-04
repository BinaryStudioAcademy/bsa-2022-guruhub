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
  isMentor: boolean;
};

const TaskManipulate: FC<Props> = ({
  onSendOnReview,
  onApprove,
  onReject,
  isMentor,
}) => {
  return (
    <div>
      {isMentor ? (
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
