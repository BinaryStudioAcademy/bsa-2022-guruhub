import { FC } from 'common/types/types';
import { useAppSelector } from 'hooks/hooks';

import { Course } from './components/components';

const Courses: FC = () => {
  const { courses } = useAppSelector((state) => state.dashboard);

  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} title={course.title} />
      ))}
    </div>
  );
};

export { Courses };
