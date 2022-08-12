import React, { ReactElement } from 'react';
import { ViewStyle } from 'react-native';
import {
  Cell,
  Rows,
  Table as UITable,
  TableWrapper,
} from 'react-native-table-component';

import { AppTextStyle } from '~/common/types/types';
import { ScrollView, View } from '~/components/common/common';

import { styles } from './styles';

type AllowedData = string | number;

type Props<Data extends Record<AllowedData, unknown>> = {
  header: Data[];
  data: Data[][];
  columnWidthArr?: number[];
  tableDataTextStyle?: AppTextStyle;
  tableHeaderTextStyle?: AppTextStyle;
  tableHeaderCellStyle?: ViewStyle;
  tableContainerStyle?: ViewStyle;
};

const Table = <Data extends Record<AllowedData, unknown>>({
  header,
  data,
  columnWidthArr,
  tableDataTextStyle,
  tableHeaderTextStyle,
  tableHeaderCellStyle,
  tableContainerStyle,
}: Props<Data>): ReactElement => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true}>
        <View>
          <ScrollView>
            <UITable style={tableContainerStyle}>
              <TableWrapper style={styles.header}>
                {header.map((cellData, cellIndex) => (
                  <Cell
                    key={cellIndex}
                    data={cellData}
                    width={columnWidthArr && columnWidthArr[cellIndex]}
                    textStyle={{
                      ...styles.headerText,
                      ...tableHeaderTextStyle,
                    }}
                    style={{
                      ...(Boolean(cellIndex) && styles.verticalSeparator),
                      ...styles.headerCell,
                      ...tableHeaderCellStyle,
                    }}
                  />
                ))}
              </TableWrapper>
              <Rows
                data={data}
                widthArr={columnWidthArr}
                textStyle={{ ...styles.dataText, ...tableDataTextStyle }}
              />
            </UITable>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export { Table };
