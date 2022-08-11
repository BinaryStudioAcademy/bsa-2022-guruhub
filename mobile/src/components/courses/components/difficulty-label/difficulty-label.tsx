import React, { FC, ReactElement } from 'react';

import {
  DifficultyLabelBegginer,
  DifficultyLabelIntermediate,
  DifficultyLabelMaster,
} from './difficulty-labels';

type Props = {
  difficulty: string;
};

const DifficultyLabel: FC<Props> = ({ difficulty }): ReactElement | null => {
  switch (difficulty.toLocaleLowerCase()) {
    case 'begginer': {
      return <DifficultyLabelBegginer />;
    }
    case 'intermediate': {
      return <DifficultyLabelIntermediate />;
    }
    case 'master': {
      return <DifficultyLabelMaster />;
    }
  }

  return null;
};

export { DifficultyLabel };
