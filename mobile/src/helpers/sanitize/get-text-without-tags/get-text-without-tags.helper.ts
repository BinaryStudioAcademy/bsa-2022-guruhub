const getTextWithoutHTMLTags = (text: string): string => {
  const formattedText = text.replace(/(<([^>]+)>)/gi, ' ');

  return formattedText;
};

export { getTextWithoutHTMLTags };
