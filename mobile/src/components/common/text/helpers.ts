import { styles } from './style';

export const selectFontColor = (color: string): object => {
  let fontColor = {};
  switch (color) {
    case 'gray_400':
      fontColor = styles.textGray_400;
      break;
    case 'gray_200':
      fontColor = styles.textGray_200;
      break;
    case 'gray_100':
      fontColor = styles.textGray_100;
      break;
    default:
      fontColor = styles.textGray_400;
      break;
  }
  return fontColor;
};

export const selectFontUsage = (usage: string): object => {
  let fontUsage = {};
  switch (usage) {
    case 'heading_1':
      fontUsage = styles.heading_1;
      break;
    case 'heading_2':
      fontUsage = styles.heading_2;
      break;
    case 'heading_3':
      fontUsage = styles.heading_3;
      break;
    case 'heading_4':
      fontUsage = styles.heading_4;
      break;
    case 'heading_5':
      fontUsage = styles.heading_5;
      break;
    case 'heading_6':
      fontUsage = styles.heading_6;
      break;
    case 'subheading':
      fontUsage = styles.subheading;
      break;
    case 'body':
      fontUsage = styles.body;
      break;
    case 'body_sm':
      fontUsage = styles.body_sm;
      break;
    case 'body_sm_bold':
      fontUsage = styles.body_sm_bold;
      break;
    case 'caption':
      fontUsage = styles.caption;
      break;
    case 'quotation':
      fontUsage = styles.quotation;
      break;
    case 'button_sm':
      fontUsage = styles.button_sm;
      break;
    case 'button':
      fontUsage = styles.button;
      break;
    case 'input':
      fontUsage = styles.input;
      break;
    case 'input_label':
      fontUsage = styles.input_label;
      break;
  }
  return fontUsage;
};
