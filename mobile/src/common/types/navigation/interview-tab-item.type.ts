import { InterviewScreenName } from '~/common/enums/enums';

type InterviewTabItem = {
  name: InterviewScreenName;
  component: React.FC;
};

export { type InterviewTabItem };
