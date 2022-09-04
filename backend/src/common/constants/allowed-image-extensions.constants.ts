import { ContentType } from '~/common/enums/enums';

const ALLOWED_IMAGE_EXTENSIONS: ContentType[] = [
  ContentType.IMAGE_JPEG,
  ContentType.IMAGE_PNG,
  ContentType.IMAGE_SVG,
];

export { ALLOWED_IMAGE_EXTENSIONS };
