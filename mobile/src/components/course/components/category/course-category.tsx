import React, { FC } from 'react';

import { Category, Pressable } from '~/components/common/common';
import { useEffect, useState } from '~/hooks/hooks';

import { getRandomColor } from './helpers/get-random-color.helper';

type Props = {
  keyName: string;
  name: string;
  onPress?: () => void;
  isActive: boolean;
};

const CourseCategory: FC<Props> = ({ isActive, keyName, name, onPress }) => {
  const [color, setColor] = useState('');

  const handlePress = (): void => {
    onPress?.();
  };

  useEffect(() => {
    setColor(getRandomColor());
  }, []);

  return (
    <Pressable onPress={handlePress}>
      <Category
        keyName={keyName}
        name={name}
        color={color}
        isActive={isActive}
      />
    </Pressable>
  );
};

export { CourseCategory };
