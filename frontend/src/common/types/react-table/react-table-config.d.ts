import {
  UseResizeColumnsColumnOptions,
  UseResizeColumnsColumnProps,
  UseResizeColumnsOptions,
  UseResizeColumnsState,
} from 'react-table';

declare module 'react-table' {
  export interface TableOptions<D extends Record<string, unknown>>
    extends UseExpandedOptions<D>,
      UseResizeColumnsOptions<D>,
      Record<string, any> {}

  interface TableState<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseResizeColumnsState<D> {}

  interface ColumnInterface<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseResizeColumnsColumnOptions<D> {}

  interface ColumnInstance<
    D extends Record<string, unknown> = Record<string, unknown>,
  > extends UseResizeColumnsColumnProps<D> {}
}
