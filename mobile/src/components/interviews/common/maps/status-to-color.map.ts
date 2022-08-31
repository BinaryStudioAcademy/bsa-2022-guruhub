import { AppColor, InterviewStatus } from '~/common/enums/enums';

const statusToColor: Record<InterviewStatus, string> = {
  [InterviewStatus.NEW]: AppColor.BRAND.YELLOW_300,
  [InterviewStatus.REJECTED]: AppColor.BRAND.PURPLE_100,
  [InterviewStatus.CANCELED]: AppColor.BRAND.RED_100,
  [InterviewStatus.COMPLETED]: AppColor.BRAND.GREEN_100,
  [InterviewStatus.PENDING]: AppColor.BRAND.BLUE_200,
  [InterviewStatus.IN_PROGRESS]: AppColor.BRAND.PINK_200,
};

export { statusToColor };
