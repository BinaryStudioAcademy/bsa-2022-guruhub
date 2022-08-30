import { getValidClasses } from 'helpers/helpers';
import { ReactElement } from 'react';
import { Column, useTable } from 'react-table';

import styles from './styles.module.scss';

type Props<Data extends Record<string, unknown>> = {
  columns: Column<Data>[];
  data: readonly Data[];
  placeholder?: string;
  onRowClick?: (row: Data) => void;
};

const Table = <Data extends Record<string, unknown>>({
  columns,
  data,
  placeholder = 'No data to display',
  onRowClick,
}: Props<Data>): ReactElement => {
  const tableInstance = useTable({
    columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const hasData = Boolean(data.length);

  if (!hasData) {
    return <p className={styles.placeholder}>{placeholder}</p>;
  }

  return (
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
          const handleRowClick = (): void => {
            onRowClick?.(row.original);
          };

          return (
            <tr
              {...row.getRowProps()}
              onClick={handleRowClick}
              className={getValidClasses(onRowClick && styles.row)}
            >
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
  );
};

export { Table };
