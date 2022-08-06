import { useTable } from 'react-table';
import { ReactTableRenderEntitiesNames } from 'components/common/table/common/react-table-render-entities-names';
import styles from './table/styles.module.scss';
import { Column } from 'react-table';
import { FC } from 'common/types/types';

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
      <thead className={styles['table-head']}>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className={styles['table-head-row']}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className={styles['table-head-row-header']}
              >
                {column.render(ReactTableRenderEntitiesNames.HEADER)}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={styles['table-body']}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className={styles['table-body-row']}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className={styles['table-body-row-data']}
                  >
                    {cell.render(ReactTableRenderEntitiesNames.CELL)}
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
