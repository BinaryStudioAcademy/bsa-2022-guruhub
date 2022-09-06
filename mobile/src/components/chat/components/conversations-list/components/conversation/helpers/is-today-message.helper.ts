const isTodayMessage = (messageDate: string): boolean => {
  const currentDay = new Date();
  const messageDay = new Date(messageDate);

  return (
    currentDay.getFullYear() === messageDay.getFullYear() &&
    currentDay.getMonth() === messageDay.getMonth() &&
    currentDay.getDate() === messageDay.getDate()
  );
};

export { isTodayMessage };
