import { AppRoute } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { Link } from 'components/common/common';
import {
  CoursesMentoringTableRow,
  CoursesMentoringTableTitleProps,
} from 'components/my-courses/common/types/types';
import { generateDynamicPath } from 'helpers/helpers';
import { CellProps } from 'react-table';

import styles from './styles.module.scss';

const TitleCell: FC<
  CellProps<CoursesMentoringTableRow, CoursesMentoringTableTitleProps>
> = ({ value: { id, title } }) => {
  return (
    <Link
      to={generateDynamicPath(AppRoute.COURSES_$ID, { courseId: id })}
      className={styles.idLink}
    >
      {title}
    </Link>
  );
};

export { TitleCell };
