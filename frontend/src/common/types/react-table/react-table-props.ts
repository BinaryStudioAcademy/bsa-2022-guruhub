import { ReactTableColumn } from './table-units/react-table-column';
import { ReactTableRow } from './table-units/react-table-row';

type ReactTableProps = {
  tableId: string;
  columnsData: Array<ReactTableColumn>;
  rowsData: Array<ReactTableRow>;
};

export { ReactTableProps };
