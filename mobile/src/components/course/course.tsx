import React, { FC } from 'react';

import defaultCourseImage from '~/assets/images/default-course-image.png';
import { DataStatus } from '~/common/enums/enums';
import { CourseGetResponseDto } from '~/common/types/types';
import {
  BackButton,
  Content,
  Image,
  ScrollView,
  Spinner,
  Text,
  View,
} from '~/components/common/common';
import { getImageUri } from '~/helpers/helpers';
import {
  useAppDispatch,
  useAppNavigate,
  useAppSelector,
  useCallback,
  useEffect,
  useFocusEffect,
  useWindowDimensions,
} from '~/hooks/hooks';
import { courseModulesActions, coursesActions } from '~/store/actions';

import { CourseModules } from './components/course-modules/course-modules';
import { styles } from './styles';

const Course: FC = () => {
  const navigation = useAppNavigate();
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const { course, dataStatus } = useAppSelector((state) => state.courses);
  const dataCourse = course as CourseGetResponseDto;

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigation.goBack} />,
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (course) {
        dispatch(
          courseModulesActions.getCourseModules({ courseId: course.id }),
        );
        dispatch(
          coursesActions.getMentorsByCourseId({
            courseId: course.id,
            filteringOpts: {
              mentorName: '',
            },
          }),
        )
          .unwrap()
          .then(() => dispatch(coursesActions.updateVisibilityBecomeMentor()));
      }

      return () => {
        dispatch(coursesActions.setBecomeMentorInvisible());
      };
    }, [course]),
  );

  if (dataStatus === DataStatus.PENDING) {
    return <Spinner isOverflow />;
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.h1}>{dataCourse?.title}</Text>
        <Image
          style={styles.image}
          source={{ uri: course?.imageUrl ?? getImageUri(defaultCourseImage) }}
        />
        <Text style={styles.h2}>About this course</Text>
        {Boolean(course?.description) && (
          <Content html={dataCourse?.description} width={width} />
        )}
        <CourseModules />
      </View>
    </ScrollView>
  );
};

export { Course };
