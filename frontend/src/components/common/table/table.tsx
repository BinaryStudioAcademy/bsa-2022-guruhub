import { ReactComponent as DeleteIcon } from 'assets/icons/trash-can-solid.svg';
import { ReactElement } from 'react';
import { Column, useTable } from 'react-table';

import styles from './styles.module.scss';

type Props<Data extends Record<string, unknown>> = {
  columns: Column<Data>[];
  data: readonly Data[];
};

const Table = <Data extends Record<string, unknown>>({
  columns,
  data,
}: Props<Data>): ReactElement => {
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        ...columns,
        {
          Header: 'Actions',
          Cell: <DeleteIcon className={styles.deleteIcon} />,
        },
      ]);
    },
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

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
  );
};

export { Table };
