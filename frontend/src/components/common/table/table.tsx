import { Column, useTable } from 'react-table';
import { FC } from 'common/types/types';
import styles from './table/styles.module.scss';

type Props = {
  columns: Column[];
  data: unknown[];
};

const Table: FC<Props> = ({ columns, data }) => {
  const tableInstance = useTable({
    columns: columns as Column<Record<string, string>>[],
    data: data as Record<string, string>[],
  });

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
