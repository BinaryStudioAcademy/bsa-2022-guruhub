import { sanitize } from 'dompurify';

const sanitizeHTML = (html: string): string => {
  return sanitize(html);
};

export { sanitizeHTML };
