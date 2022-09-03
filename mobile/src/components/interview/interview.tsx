import React, { FC } from 'react';

import { AppScreenName } from '~/common/enums/enums';
import { BackButton } from '~/components/common/common';
import { useAppNavigate, useEffect } from '~/hooks/hooks';
import { Interview as InterviewScreen } from '~/navigation/interview/interview.navigation';

const Interview: FC = () => {
  const navigation = useAppNavigate();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <BackButton
          onPress={(): void => navigation.navigate(AppScreenName.INTERVIEWS)}
        />
      ),
    });
  }, []);

  return <InterviewScreen />;
};

export { Interview };
