import React, { FC } from 'react';

import { Checkbox } from '~/components/common/common';
import { useAppForm, useEffect } from '~/hooks/hooks';

type Props = {
  name: string;
  onToggle: () => void;
  isChecked: boolean;
};

const ActionCell: FC<Props> = ({ name, onToggle, isChecked }) => {
  const { control, reset } = useAppForm({
    defaultValues: {
      [name]: isChecked,
    },
  });

  useEffect(() => {
    reset({
      [name]: isChecked,
    });
  }, [name, isChecked]);

  return <Checkbox name={name} control={control} onToggle={onToggle} />;
};

export { ActionCell };
