import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { Icon, Input, Pressable, View } from '~/components/common/common';
import { CourseUpdateMentoringForm } from '~/components/my-courses/common/types/course-update-mentoring-form.type';
import { useAppDispatch, useAppForm } from '~/hooks/hooks';
import { myCoursesActions } from '~/store/actions';
import { courseMentoringUpdateCount } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

type Props = {
  studentsCount: number;
  courseId: number;
};

const StudentsCountCell: FC<Props> = ({ courseId, studentsCount }) => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit } =
    useAppForm<CourseUpdateMentoringForm>({
      defaultValues: {
        courseId: courseId,
        studentsCount: studentsCount.toString(),
      },
      validationSchema: courseMentoringUpdateCount,
    });

  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };

  const handleEditCourse = (course: CourseUpdateMentoringForm): void => {
    dispatch(
      myCoursesActions.updateCoursesMentoring({
        courseId: course.courseId,
        studentsCount: parseInt(course.studentsCount),
      }),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <Input
          name="studentsCount"
          control={control}
          errors={errors}
          keyboardType="numeric"
        />
      </View>
      <Pressable
        hitSlop={hitSlop}
        style={styles.icon}
        onPress={handleSubmit(handleEditCourse)}
      >
        <Icon
          name="save"
          color={AppColor.BRAND.BLUE_100}
          width={20}
          height={20}
        />
      </Pressable>
    </View>
  );
};

export { StudentsCountCell };
