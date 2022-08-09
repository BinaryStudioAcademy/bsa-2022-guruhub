import { TIME_CONSTANTS } from '../common/constants/constants';

const convertTimeDifferenceIntoSecondsDifference = (time: number): number => {
  return Math.floor(time / TIME_CONSTANTS.MILLISECONDS_IN_SECOND);
};

const getTimeDifferenceWithCurrentTime = (time: string): string => {
  const dateTimeStamp = new Date(time).getTime();
  const timeDifferenceInMilliseconds = new Date().getTime() - dateTimeStamp;

  return `${convertTimeDifferenceIntoSecondsDifference(
    timeDifferenceInMilliseconds,
  )} seconds ago`;
};

export { getTimeDifferenceWithCurrentTime };
