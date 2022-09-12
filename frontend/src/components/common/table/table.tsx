import { Pagination } from 'components/common/common';
import { ReactElement, useMemo } from 'react';
import { Column, useResizeColumns, useTable } from 'react-table';

import styles from './styles.module.scss';

type Props<Data extends Record<string, unknown>> = {
  columns: Column<Data>[];
  data: readonly Data[];
  totalCount?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (newPage: number) => void;
  placeholder?: string;
  bodyRowPadding?: string;
};

const Table = <Data extends Record<string, unknown>>({
  columns,
  data,
  totalCount,
  pageSize,
  currentPage,
  onPageChange,
  placeholder = 'No data to display',
  bodyRowPadding,
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
    useResizeColumns,
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const hasData = Boolean(data.length);
  const hasPagination = totalCount && pageSize && currentPage && onPageChange;

  if (!hasData) {
    return <p className={styles.placeholder}>{placeholder}</p>;
  }

  return (
    <>
      <table {...getTableProps()} className={styles.table}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
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
          {rows.map((row) => {
            prepareRow(row);

            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      {...cell.getCellProps()}
                      width={cell.column.width}
                      className={styles.tableBodyRowData && bodyRowPadding}
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
      {hasPagination && (
        <Pagination
          currentPage={currentPage}
          onPageChange={onPageChange}
          pageSize={pageSize}
          totalCount={totalCount}
        />
      )}
    </>
  );
};

export { Table };
