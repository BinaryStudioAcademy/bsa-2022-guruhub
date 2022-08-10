import React, { FC, ReactElement } from 'react';
import { Image,Text, View } from 'react-native';

import { styles } from './style';

type DifficultyLabel = {
  difficulty: string;
};

const DifficultyLabel: FC<DifficultyLabel> = ({ difficulty }): ReactElement => {
  const DIFFICULTY_ICON = {
    begginer: {
      uri: require('./assets/images/begginer.png'),
      text: 'Begginer',
    },
    intermediate: {
      uri: require('./assets/images/intermediate.png'),
      text: 'Intermediate',
    },
    master: {
      uri: require('./assets/images/master.png'),
      text: 'Master',
    },
  };

  let imgSource;
  let difficultyText;

  switch (difficulty.toLowerCase()) {
    case 'begginer':
      imgSource = DIFFICULTY_ICON.begginer.uri;
      difficultyText = DIFFICULTY_ICON.begginer.text;
      break;
    case 'intermediate':
      imgSource = DIFFICULTY_ICON.intermediate.uri;
      difficultyText = DIFFICULTY_ICON.intermediate.text;
      break;
    case 'master':
      imgSource = DIFFICULTY_ICON.master.uri;
      difficultyText = DIFFICULTY_ICON.master.text;
      break;
    default:
      break;
  }

  return (
    <>
      {difficulty && (
        <View style={styles.container}>
          <Text style={styles.text}>{difficultyText}</Text>
          <Image style={styles.icon} source={imgSource} />
        </View>
      )}
    </>
  );
};

export { DifficultyLabel };
