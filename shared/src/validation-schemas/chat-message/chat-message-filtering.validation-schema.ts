import * as Joi from 'joi';

import { ChatMessageFilteringDto } from '~/common/types/types';
import { getNameOf } from '~/helpers/helpers';

const chatMessageFiltering = Joi.object({
  [getNameOf<ChatMessageFilteringDto>('fullName')]: Joi.string().allow(
    null,
    '',
  ),
});

export { chatMessageFiltering };
