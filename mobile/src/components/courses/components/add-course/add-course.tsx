import React, { FC, useCallback } from 'react';
import { View } from 'react-native';

import { AppScreenName } from '~/common/enums/enums';
import { CourseCreateRequestDto } from '~/common/types/types';
import { Button, Input, Text } from '~/components/common/common';
import {
  useAppDispatch,
  useAppForm,
  useAppNavigate,
  useFocusEffect,
} from '~/hooks/hooks';
import { coursesActions } from '~/store/actions';
import { courseCreate as courseCreateValidationSchema } from '~/validation-schemas/validation-schemas';

import { DEFAULT_CREATE_COURSE_PAYLOAD } from './common/constants/constants';
import { styles } from './style';

const AddCourse: FC = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigate();
  const { control, errors, handleSubmit, reset } =
    useAppForm<CourseCreateRequestDto>({
      defaultValues: DEFAULT_CREATE_COURSE_PAYLOAD,
      validationSchema: courseCreateValidationSchema,
    });

  const handleSubmitCourse = async (
    payload: CourseCreateRequestDto,
  ): Promise<void> => {
    await dispatch(coursesActions.addCourse(payload)).unwrap();
    navigation.navigate(AppScreenName.COURSES);
  };

  useFocusEffect(
    useCallback(() => {
      return () => reset({ url: '' });
    }, []),
  );

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Import</Text>
      <Input
        label="Place the link"
        control={control}
        errors={errors}
        name="url"
      />
      <View style={styles.buttonContainer}>
        <Button
          label="Submit course"
          onPress={handleSubmit(handleSubmitCourse)}
        />
      </View>
    </View>
  );
};

export { AddCourse };
