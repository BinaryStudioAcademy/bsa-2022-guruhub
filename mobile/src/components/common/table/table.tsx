import React, { ReactElement } from 'react';
import {
  Cell,
  Table as UITable,
  TableWrapper,
} from 'react-native-table-component';

import { TableColumn } from '~/common/types/ui/ui';
import { ScrollView, View } from '~/components/common/common';

import { styles } from './styles';

type Props<Data extends Record<string, unknown>> = {
  columns: TableColumn<Data>[];
  data: Data[];
  columnWidthArr?: number[];
  showScrollbar?: boolean;
};

const Table = <Data extends Record<string, unknown>>({
  columns,
  data,
  columnWidthArr,
  showScrollbar = true,
}: Props<Data>): ReactElement => {
  const headers = columns.map(({ header }) => header);
  const tableData = data.map((entry) =>
    columns.map(({ accessor }) => entry[accessor]),
  );

  return (
    <ScrollView
      horizontal={true}
      contentContainerStyle={styles.scrollView}
      persistentScrollbar={showScrollbar}
    >
      <View style={styles.container}>
        <UITable style={styles.header}>
          {headers.map((cellData, cellIndex) => (
            <Cell
              key={cellIndex}
              data={cellData}
              width={columnWidthArr && columnWidthArr[cellIndex]}
              textStyle={styles.headerText}
              style={{
                ...(Boolean(cellIndex) && styles.verticalSeparator),
                ...styles.headerCell,
              }}
            />
          ))}
        </UITable>
        <UITable>
          {tableData.map((rowData, index) => (
            <TableWrapper key={index} style={styles.dataRow}>
              {rowData.map((cellData, cellIndex) => (
                <Cell
                  key={cellIndex}
                  data={cellData}
                  width={columnWidthArr && columnWidthArr[cellIndex]}
                  style={styles.dataCell}
                  textStyle={styles.dataText}
                />
              ))}
            </TableWrapper>
          ))}
        </UITable>
      </View>
    </ScrollView>
  );
};

export { Table };
