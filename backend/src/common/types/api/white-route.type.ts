import { HttpMethod } from '~/common/enums/enums';

type WhiteRoute = {
  route: string;
  methods: HttpMethod[];
};

export { type WhiteRoute };
