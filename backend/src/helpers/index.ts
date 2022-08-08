import { paramCase, Options } from 'change-case';
import { Case } from '~/common/enums/case/case.enum';

const caseTypeToFn: Record<Case, typeof paramCase> = {
  'kebab': paramCase,
};
const changeStringCase = (
  string: string,
  caseType: Case,
  options?: Options,
  // eslint-disable-next-line max-params
): string => {
  const getChangedStringCase = caseTypeToFn[caseType];

  return getChangedStringCase(string, options);
};
export { changeStringCase };
