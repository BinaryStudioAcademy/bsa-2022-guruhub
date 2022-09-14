import { AppColor, TaskStatus } from '~/common/enums/enums';

const statusToColor: Record<TaskStatus, string> = {
  [TaskStatus.REJECTED]: AppColor.BRAND.RED_100,
  [TaskStatus.UNCOMPLETED]: AppColor.BRAND.YELLOW_200,
  [TaskStatus.COMPLETED]: AppColor.BRAND.GREEN_100,
  [TaskStatus.PENDING]: AppColor.BRAND.BLUE_200,
};

export { statusToColor };
