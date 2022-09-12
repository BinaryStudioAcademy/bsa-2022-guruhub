import { Asset, launchImageLibrary } from 'react-native-image-picker';

const pickImage = async (
  selectionLimit: number,
): Promise<Asset[] | undefined> => {
  const res = await launchImageLibrary({
    mediaType: 'photo',
    selectionLimit: selectionLimit,
  });

  return res.assets;
};

export { pickImage };
