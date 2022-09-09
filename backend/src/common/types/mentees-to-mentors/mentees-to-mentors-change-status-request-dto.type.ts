import { MenteesToMentorsStatus } from '~/common/enums/enums';

type MenteesToMentorsChangeStatusRequestDto = {
  id: number;
  status: MenteesToMentorsStatus;
};

export { type MenteesToMentorsChangeStatusRequestDto };
