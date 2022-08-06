import { ReactElement } from 'react';
import { ReactTableProps } from 'common/types/react-table/react-table-props';
import { useTable } from '../../hooks/use-table/use-table';
import { ReactTableRenderEntitiesNames } from 'components/common/react-table/react-table-render-entities-names';
import { ClassNames } from './common/class-names';

const Table = ({
  tableId,
  columnsData,
  rowsData,
}: ReactTableProps): ReactElement => {
  const cellPaddingValueInPixels = 20;

  const tableInstance = useTable({ columns: columnsData, data: rowsData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table
      {...getTableProps()}
      id={tableId}
      className={ClassNames.TABLE}
      cellPadding={cellPaddingValueInPixels}
    >
      <thead className={ClassNames.TABLE_HEAD}>
        {headerGroups.map((headerGroup) => (
          <tr
            {...headerGroup.getHeaderGroupProps()}
            className={ClassNames.TABLE_HEAD_ROW}
          >
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className={ClassNames.TABLE_HEAD_ROW_HEADER}
              >
                {column.render(ReactTableRenderEntitiesNames.HEADER)}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className={ClassNames.TABLE_BODY}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className={ClassNames.TABLE_BODY_ROW}>
              {row.cells.map((cell) => {
                return (
                  <td
                    {...cell.getCellProps()}
                    className={ClassNames.TABLE_BODY_ROW_DATA}
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
