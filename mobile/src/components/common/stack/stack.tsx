import React, { FC } from 'react';

import { StackDirection } from '~/common/enums/enums';

import { View } from '../common';

type Props = {
  children: any[];
  space?: number;
  direction?: StackDirection;
};

const Stack: FC<Props> = ({
  children,
  space,
  direction = StackDirection.COLUMN,
}) => {
  const separatorStyle = {
    marginBottom:
      direction === StackDirection.ROW ||
      direction === StackDirection.ROW_REVERSE
        ? 0
        : space,
    marginLeft:
      direction === StackDirection.COLUMN ||
      direction === StackDirection.COLUMN_REVERSE
        ? 0
        : space,
  };

  if (!Array.isArray(children)) {
    return children;
  }

  return (
    <View style={{ flexDirection: direction }}>
      {children.map((child, index) => (
        <React.Fragment key={child.key ?? index}>
          {child}
          {index !== children.length - 1 && <View style={separatorStyle} />}
        </React.Fragment>
      ))}
    </View>
  );
};

export { Stack };
