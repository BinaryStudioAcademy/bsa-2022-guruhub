import { StylesConfig } from 'react-select';

import { SelectorOption } from './selector-option.type';

type SelectStyles = StylesConfig<SelectorOption<string | number>, false>;

export { type SelectStyles };
