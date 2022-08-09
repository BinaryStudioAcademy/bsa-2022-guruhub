import { Options, paramCase, snakeCase } from 'change-case';

import { StringCase } from '~/common/enums/case/case.enum';

const caseTypeToFn: Record<StringCase, typeof paramCase> = {
  [StringCase.KEBAB_CASE]: paramCase,
  [StringCase.SNAKE_CASE]: snakeCase,
};

type Args = {
  stringToChange: string;
  caseType: StringCase;
  options?: Options;
};

const changeStringCase = (args: Args): string => {
  const getChangedStringCase = caseTypeToFn[args.caseType];

  return getChangedStringCase(args.stringToChange, args.options);
};

export { changeStringCase };
