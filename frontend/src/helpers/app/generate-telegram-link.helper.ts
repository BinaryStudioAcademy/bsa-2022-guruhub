const TELEGRAM_URL = 'https://t.me/';

const generateTelegramLink = (username: string): string => {
  return TELEGRAM_URL + username;
};

export { generateTelegramLink };
