import { Pagination } from 'components/common/common';
import { ReactElement, useMemo } from 'react';
import {
  Column,
  TableCellProps,
  TableHeaderProps,
  useFlexLayout,
  useResizeColumns,
  useTable,
} from 'react-table';

import styles from './styles.module.scss';

type OnPageChangeHandler = (newPage: number) => void;

type Props<Data extends Record<string, unknown>> = {
  columns: Column<Data>[];
  data: readonly Data[];
  totalCount?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: OnPageChangeHandler;
  placeholder?: string;
};

const Table = <Data extends Record<string, unknown>>({
  columns,
  data,
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  placeholder = 'No data to display',
}: Props<Data>): ReactElement => {
  const defaultColumn = useMemo(
    () => ({
      minWidth: 20,
      width: 200,
      maxWidth: 400,
    }),
    [],
  );

  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFlexLayout,
    useResizeColumns,
  );

  const getStyles = (
    props: Partial<TableHeaderProps> | Partial<TableCellProps>,
  ): (Partial<TableHeaderProps> | Partial<TableCellProps>)[] => [
    props,
    {
      style: {
        display: 'flex',
      },
    },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const hasData = Boolean(data.length);
  const hasPagination = Boolean(
    totalCount && pageSize && currentPage && onPageChange,
  );

  return (
    <>
      <div className={styles.tableWrapper}>
        <table {...getTableProps()} className={styles.table}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(getStyles)}
                    className={styles.tableHeadRowHeader}
                  >
                    {column.render('Header')}
                    <div
                      {...column.getResizerProps()}
                      className={styles.resizer}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {!hasData && (
              <tr className={styles.placeholder}>
                <td>
                  <p>{placeholder}</p>
                </td>
              </tr>
            )}

            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps(getStyles)}
                        width={cell.column.width}
                        className={styles.tableBodyRowData}
                      >
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {hasPagination && hasData && (
        <Pagination
          currentPage={currentPage as number}
          onPageChange={onPageChange as OnPageChangeHandler}
          pageSize={pageSize as number}
          totalCount={totalCount as number}
        />
      )}
    </>
  );
};

export { Table };
