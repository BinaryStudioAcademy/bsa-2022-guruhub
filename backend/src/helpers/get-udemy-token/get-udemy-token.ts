import { ENV } from '~/common/enums/enums';

const getUdemyToken = (): string => {
  return Buffer.from(
    `${ENV.UDEMY.CLIENT_ID}:${ENV.UDEMY.CLIENT_SECRET}`,
    'utf-8',
  ).toString('base64');
};

export { getUdemyToken };
