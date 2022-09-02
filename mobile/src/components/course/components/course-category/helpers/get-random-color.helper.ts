import { AppColor } from '~/common/enums/enums';

const getRandomColor = (): string => {
  const colors = Object.values(AppColor.BRAND);

  return colors[Math.floor(Math.random() * colors.length)];
};

export { getRandomColor };
