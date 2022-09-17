import React, { FC } from 'react';

import { BackButton } from '~/components/common/common';
import { useAppNavigate, useEffect } from '~/hooks/hooks';
import { MyCourses as MyCoursesScreen } from '~/navigation/my-courses/my-courses.navigation';

const MyCourses: FC = () => {
  const navigation = useAppNavigate();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton onPress={(): void => navigation.goBack()} />
      ),
    });
  }, []);

  return <MyCoursesScreen />;
};

export { MyCourses };
