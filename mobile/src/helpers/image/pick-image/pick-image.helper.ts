import { Asset, launchImageLibrary } from 'react-native-image-picker';

const pickImage = async (): Promise<Asset | undefined> => {
  const res = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: 1,
  });

  if (!res.assets?.length) {
    return;
  }

  return res.assets[0];
};

const pickImages = async (selectionLimit: number): Promise<Asset[]> => {
  const res = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: selectionLimit,
  });

  return res.assets ?? [];
};

export { pickImage, pickImages };
