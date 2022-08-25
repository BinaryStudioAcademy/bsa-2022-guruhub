import { sanitize } from 'isomorphic-dompurify';

const sanitizeHTML = (html: string): string => {
  return sanitize(html, {});
};

export { sanitizeHTML };
