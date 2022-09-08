import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { BackButton, View } from '~/components/common/common';
import { useAppNavigate, useEffect } from '~/hooks/hooks';

const EditCourse: FC = () => {
  const navigation = useAppNavigate();

  const navigateToCourseManagement = (): void => {
    navigation.navigate(AppScreenName.COURSE_MANAGEMENT);
  };

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => <BackButton onPress={navigateToCourseManagement} />,
    });
  }, []);

  return <View />;
};

export { EditCourse };
