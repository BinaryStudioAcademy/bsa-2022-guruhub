import { AppColor, TaskStatus } from '~/common/enums/enums';

const statusToColor: Record<TaskStatus, string> = {
  [TaskStatus.UNCOMPLETED]: AppColor.TEXT.GRAY_200,
  [TaskStatus.REJECTED]: AppColor.BRAND.PINK_100,
  [TaskStatus.COMPLETED]: AppColor.BRAND.GREEN_100,
  [TaskStatus.PENDING]: AppColor.SUPPORT.INFO_BLUE_100,
};

export { statusToColor };
