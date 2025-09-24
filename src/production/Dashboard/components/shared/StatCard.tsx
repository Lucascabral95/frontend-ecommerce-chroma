import { StatCardProps } from "./Dashboars-interfaces";

const StatCard = ({ icon: Icon, label, value, testId }: StatCardProps) => (
  <div className="var" data-testid={testId}>
    <div className="icon-text">
      <div className="icono">
        <Icon className="icon" />
      </div>
      <p>{label}</p>
    </div>
    <div className="text-variant">
      <p className="quantity">{value}</p>
    </div>
  </div>
);

export default StatCard;
