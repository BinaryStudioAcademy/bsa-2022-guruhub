import { ReactTableProps } from 'common/types/react-table/react-table-props';
import { useTable } from 'react-table';
import { ReactTableRenderEntitiesNames } from 'components/common/react-table/react-table-render-entities-names';
import { ReactElement } from 'react';

const Table = ({
  tableId,
  columnsData,
  rowsData,
}: ReactTableProps): ReactElement => {
  const tableInstance = useTable({ columns: columnsData, data: rowsData });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()} id={tableId}>
      <thead className="table-head">
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()} className="table-head-row">
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="table-head-row-header"
              >
                {column.render(ReactTableRenderEntitiesNames.HEADER)}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()} className="table-body">
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} className="table-body-row">
              {row.cells.map((cell) => {
                return (
                  <td {...cell.getCellProps()} className="table-body-row-data">
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
