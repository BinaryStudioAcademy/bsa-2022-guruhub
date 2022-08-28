import sanitizeHtml from 'sanitize-html';

const sanitizeHTML = (html: string): string => {
  return sanitizeHtml(html, {});
};

export { sanitizeHTML };
