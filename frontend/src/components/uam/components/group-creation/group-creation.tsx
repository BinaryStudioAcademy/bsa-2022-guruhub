import { Table } from 'components/common/table/table';
import { Column } from 'react-table';
import styles from './group-creation.module.scss';
import { FC } from 'common/types/types';
import { Button, Checkbox } from 'components/common/common';
import { useAppDispatch, useAppSelector, useEffect } from 'hooks/hooks';
import { uamActions } from 'store/actions';
import { getGroupCreationRows } from 'helpers/get-rows-helper/get-rows.helper';
import { getGroupCreationColumns } from 'helpers/get-columns-helper/get-columns.helper';

const GroupCreation: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.uam);

  useEffect(() => {
    dispatch(uamActions.getUsers());
  }, []);

  const rows = getGroupCreationRows(users);
  const columns = getGroupCreationColumns();

  const testData2 = [
    {
      checkbox: (
        <Checkbox
          styles={{
            wrapperClass: styles.checkboxWrapper,
            inputClass: styles.checked,
          }}
        />
      ),
      email: 'manage-bs',
      fullname: '2 months ago',
    },
    {
      col1: (
        <Checkbox
          styles={{
            wrapperClass: styles.checkboxWrapper,
            inputClass: styles.checked,
          }}
        />
      ),
      col2: 'manage-eam',
      col3: '2 months ago',
    },
  ];

  const testCols2 = [
    {
      Header: '',
      accessor: 'id',
    },
    {
      Header: 'Policy name',
      accessor: 'email',
    },
    {
      Header: 'Created',
      accessor: 'fullName',
    },
  ];

  return (
    <div className={styles.main}>
      <div className={styles.groupForm}>
        <div className={styles.groupFormHeaderWrapper}>
          <h2 className={styles.groupFormHeading}>Create group</h2>
        </div>
        <div className={styles.groupWorkers}>
          <h5 className={styles.groupSubHeading}>
            Add workers to the Group - Optional
          </h5>
          <Table data={rows} columns={columns} />
          <span className={styles.groupWorkersAmount}>
            {users.length} results
          </span>
        </div>
        <div className={styles.groupPermissions}>
          <h5 className={styles.groupSubHeading}>
            Attach permissions policies
          </h5>
          <Table data={testData2} columns={testCols2 as Column[]} />
        </div>
        <div className={styles.btnsWrapper}>
          <Button
            type={'button'}
            label={'Cancel'}
            className={styles.btnSecondary}
          />
          <Button
            type={'button'}
            label={'Create'}
            className={styles.btnPrimary}
          />
        </div>
      </div>
    </div>
  );
};

export { GroupCreation };
