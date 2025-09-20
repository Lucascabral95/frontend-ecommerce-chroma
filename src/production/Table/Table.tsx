import "./Table.scss";

interface Props<T> {
  headers: string[];
  data: T[];
  renderRow: (item: T) => React.ReactNode;
  rowKey?: (item: T, index: number) => string | number;
}

function Table<T>({ headers, data, renderRow, rowKey }: Props<T>) {
  return (
    <table className="table-dynamic">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, i) => (
          <tr key={rowKey ? rowKey(item, i) : i}>{renderRow(item)}</tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
