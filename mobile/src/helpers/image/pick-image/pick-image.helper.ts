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

export { pickImage };
