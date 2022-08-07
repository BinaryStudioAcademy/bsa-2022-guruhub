import React from 'react';
import { Text } from 'react-native';
import { selectFontColor, selectFontUsage } from './helpers';

type Props = {
  innerText: string;
  style: {
    fontColor: 'gray_400' | 'gray_200' | 'gray_100';
    fontUsage:
      | 'heading_1'
      | 'heading_2'
      | 'heading_3'
      | 'heading_4'
      | 'heading_5'
      | 'heading_6'
      | 'subheading'
      | 'body'
      | 'body_sm'
      | 'body_sm_bold'
      | 'caption'
      | 'quotation'
      | 'button_sm'
      | 'button'
      | 'input'
      | 'input_label';
  };
};

export const TextCustom: React.FC<Props> = ({ innerText, style }) => {
  const textFontUsage = selectFontUsage(style.fontUsage);
  const textFontColor = selectFontColor(style.fontColor);

  return <Text style={[textFontUsage, textFontColor]}>{innerText}</Text>;
};
