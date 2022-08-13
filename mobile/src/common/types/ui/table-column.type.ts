type TableColumn<Data extends Record<string, unknown>> = {
  header: string;
  accessor: keyof Data;
};

export { type TableColumn };
