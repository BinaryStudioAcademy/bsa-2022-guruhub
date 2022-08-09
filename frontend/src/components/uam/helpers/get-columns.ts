import { Column } from 'react-table';
import { usersColumns } from '../common/users-columns';

export function getColumns(): Column[] {
  return usersColumns;
}
