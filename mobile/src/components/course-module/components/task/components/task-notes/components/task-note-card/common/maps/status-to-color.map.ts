import { AppColor, TaskStatus } from '~/common/enums/enums';

const statusToColor: Record<TaskStatus, string> = {
  [TaskStatus.UNCOMPLETED]: AppColor.BRAND.YELLOW_300,
  [TaskStatus.REJECTED]: AppColor.BRAND.PURPLE_100,
  [TaskStatus.COMPLETED]: AppColor.BRAND.GREEN_100,
  [TaskStatus.PENDING]: AppColor.BRAND.BLUE_200,
};

export { statusToColor };
