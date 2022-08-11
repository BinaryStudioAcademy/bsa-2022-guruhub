import React, { FC, Fragment, ReactNode } from 'react';

import { View } from '~/components/common/common';

type Props = {
  children: ReactNode;
  space?: number;
  isHorizontal?: boolean;
};

const Stack: FC<Props> = ({ children, space, isHorizontal }) => {
  const separatorStyle = {
    marginTop: isHorizontal ? 0 : space,
    marginLeft: isHorizontal ? space : 0,
  };

  if (!Array.isArray(children)) {
    return <>{children}</>;
  }

  return (
    <View style={{ flexDirection: isHorizontal ? 'row' : 'column' }}>
      {children.map((child, index) => (
        <Fragment key={child.key ?? index}>
          {Boolean(index) && <View style={separatorStyle} />}
          {child}
        </Fragment>
      ))}
    </View>
  );
};

export { Stack };
