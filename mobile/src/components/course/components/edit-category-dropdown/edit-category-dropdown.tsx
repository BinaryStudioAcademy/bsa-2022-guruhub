import React, { FC } from 'react';

import {
  CategoryGetAllItemResponseDto,
  CourseUpdateCategoryRequestDto,
} from '~/common/types/types';
import { Button, Dropdown, View } from '~/components/common/common';
import { useAppForm, useEffect } from '~/hooks/hooks';
import { courseUpdateCategory as courseUpdateCategoryValidationSchema } from '~/validation-schemas/validation-schemas';

import { styles } from './styles';

type Props = {
  categories: CategoryGetAllItemResponseDto[];
  courseCategoryId: number | undefined;
  onSave: (payload: CourseUpdateCategoryRequestDto) => void;
};

const EditCategoryDropdown: FC<Props> = ({
  categories,
  courseCategoryId,
  onSave,
}) => {
  const categoriesData = categories.map(({ name, id }) => ({
    label: name,
    value: id,
  }));

  const { control, handleSubmit, reset, errors } =
    useAppForm<CourseUpdateCategoryRequestDto>({
      defaultValues: {},
      validationSchema: courseUpdateCategoryValidationSchema,
    });

  useEffect(() => {
    if (courseCategoryId) {
      reset({
        newCategoryId: courseCategoryId,
      });
    }
  }, [courseCategoryId]);

  return (
    <>
      <Dropdown
        items={categoriesData}
        control={control}
        name="newCategoryId"
        errors={errors}
        placeholder="Select category"
      />
      <View style={styles.saveButtonContainer}>
        <Button label="Save" onPress={handleSubmit(onSave)} />
      </View>
    </>
  );
};

export { EditCategoryDropdown };
