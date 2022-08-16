import React, { ReactElement } from 'react';
import { Cell, Rows, Table as UITable } from 'react-native-table-component';

import { TableColumn } from '~/common/types/ui/ui';
import { ScrollView, View } from '~/components/common/common';

import { styles } from './styles';

type Props<Data extends Record<string, unknown>> = {
  columns: TableColumn<Data>[];
  data: Data[];
  columnWidthArr?: number[];
};

const Table = <Data extends Record<string, unknown>>({
  columns,
  data,
  columnWidthArr,
}: Props<Data>): ReactElement => {
  const headers = columns.map(({ header }) => header);
  const tableData = data.map((entry) =>
    columns.map(({ accessor }) => entry[accessor]),
  );

  return (
    <ScrollView horizontal={true}>
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
        <ScrollView>
          <UITable>
            <Rows
              data={tableData}
              widthArr={columnWidthArr}
              textStyle={styles.dataText}
            />
          </UITable>
        </ScrollView>
      </View>
    </ScrollView>
  );
};

export { Table };
