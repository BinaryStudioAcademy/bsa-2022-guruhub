import { FC, TaskNoteFormRequestDto } from 'common/types/types';

import { CREATE_NOTE_DEFAULT_VALUES } from './common';
import { TaskManipulateStudent } from './components/components';

type Props = {
  onSendOnReview: (payload: TaskNoteFormRequestDto) => void;
};

const TaskManipulate: FC<Props> = ({ onSendOnReview }) => {
  return (
    <div>
      <TaskManipulateStudent
        defaultValues={CREATE_NOTE_DEFAULT_VALUES}
        onSubmit={onSendOnReview}
      />
    </div>
  );
};

export { TaskManipulate };
