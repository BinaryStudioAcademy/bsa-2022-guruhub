const convertTimeDifferenceIntoSecondsDifference = (time: number): number => {
  const millisecondsInSecond = 1000;

  return Math.floor(time / millisecondsInSecond);
};

const getTimeDifferenceWithCurrentTime = (time: string): string => {
  const dateTimeStamp = new Date(time).getTime();
  const timeDifferenceInMilliseconds = new Date().getTime() - dateTimeStamp;

  return `${convertTimeDifferenceIntoSecondsDifference(
    timeDifferenceInMilliseconds,
  )} seconds ago`;
};

export { getTimeDifferenceWithCurrentTime };
