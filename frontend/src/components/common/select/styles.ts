import {
  CSSObjectWithLabel,
  GroupBase,
  OptionProps,
  SelectorOption,
  SelectStyles,
} from 'common/types/types';

const DEFAULT_SELECT_STYLES: SelectStyles = {
  option: (
    styles: CSSObjectWithLabel,
    state: OptionProps<
      SelectorOption<string | number>,
      false,
      GroupBase<SelectorOption<string | number>>
    >,
  ): CSSObjectWithLabel => ({
    ...styles,
    backgroundColor: state.isFocused ? '#2563EB' : '#343646',
  }),
  input: (styles: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...styles,
    color: 'var(--typography-text-100-inverse)',
  }),
};

export { DEFAULT_SELECT_STYLES };
