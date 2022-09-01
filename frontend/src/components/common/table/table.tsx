import { Pagination } from 'components/common/common';
import { ReactElement } from 'react';
import { Column, useTable } from 'react-table';

import styles from './styles.module.scss';

type Props<Data extends Record<string, unknown>> = {
  columns: Column<Data>[];
  data: readonly Data[];
  totalCount?: number;
  pageSize?: number;
  currentPage?: number;
  onPageChange?: (newPage: number) => void;
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
  const tableInstance = useTable({
    columns,
    data,
  });

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
