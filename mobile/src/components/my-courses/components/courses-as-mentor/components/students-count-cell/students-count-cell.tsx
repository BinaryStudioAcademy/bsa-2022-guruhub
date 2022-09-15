import React, { FC } from 'react';

import { AppColor } from '~/common/enums/enums';
import { CourseUpdateMentoringDto } from '~/common/types/types';
import { Icon, Input, Pressable, View } from '~/components/common/common';
import { getNameOf } from '~/helpers/helpers';
import { useAppDispatch, useAppForm, useEffect } from '~/hooks/hooks';
import { myCoursesActions } from '~/store/actions';
import { courseMentoringUpdateCount } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

type Props = {
  studentsCount: number;
  courseId: number;
};

const StudentsCountCell: FC<Props> = ({ courseId, studentsCount }) => {
  const dispatch = useAppDispatch();

  const { control, errors, handleSubmit, setValue } =
    useAppForm<CourseUpdateMentoringDto>({
      defaultValues: { courseId: courseId, studentsCount: undefined },
      validationSchema: courseMentoringUpdateCount,
    });

  const hitSlop = { top: 5, bottom: 5, left: 5, right: 5 };

  const handleEditCourse = (course: CourseUpdateMentoringDto): void => {
    dispatch(myCoursesActions.updateCoursesMentoring(course));
  };

  useEffect(() => {
    setValue(
      getNameOf<CourseUpdateMentoringDto>('studentsCount'),
      studentsCount.toString(),
    );
  }, []);

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
