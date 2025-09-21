import "./TableDashboard.scss";

interface Props {
  headers: string[];
  rows: React.ReactNode;
}

function TableDashboard({ headers, rows }: Props) {
  return (
    <div className="table-of-dashboard">
      <div className="table-of-dashboard__container">
        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                {headers.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TableDashboard;
