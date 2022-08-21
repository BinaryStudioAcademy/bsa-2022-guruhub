import { AppRoute, DataStatus } from 'common/enums/enums';
import { FC } from 'common/types/types';
import { IconButton, Spinner } from 'components/common/common';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useParams,
} from 'hooks/hooks';
import { courseModuleActions } from 'store/actions';

import styles from './styles.module.scss';

const Module: FC = () => {
  const { courseId, moduleId } = useParams();
  const { dataStatus, module } = useAppSelector((state) => state.courseModule);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      courseModuleActions.getById({
        courseId: Number(courseId),
        moduleId: Number(moduleId),
      }),
    );
  }, []);

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.buttonWrapper}>
        <IconButton
          label="back"
          iconName="leftArrow"
          to={`${AppRoute.COURSES}/${courseId}` as AppRoute}
          iconColor="blue"
        />
      </div>
      <h1 className={styles.courseName}>{module?.courseTitle}</h1>
      <div className={styles.moduleNameContainer}>
        <div className={styles.moduleNameContent}>
          <h4>{module?.title}</h4>
          <p
            className={styles.moduleDescription}
            dangerouslySetInnerHTML={{ __html: module?.description || '' }}
          />
        </div>
      </div>
      <div>
        <p dangerouslySetInnerHTML={{ __html: module?.description || '' }} />
      </div>
    </div>
  );
};

export { Module };
