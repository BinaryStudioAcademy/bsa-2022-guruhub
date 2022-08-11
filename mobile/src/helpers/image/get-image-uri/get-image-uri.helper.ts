import { Image, ImageSourcePropType } from 'react-native';

const getImageUri = (image: ImageSourcePropType): string => {
  return Image.resolveAssetSource(image).uri;
};

export { getImageUri };
