import React from "react";
import "./SectionStructure.scss";

interface Props {
  children: React.ReactNode;
  background?: string;
}

function SectionStructure({ children, background }: Props) {
  return (
    <div className="section-structure" style={{ background }}>
      <div className="section-structure__container">{children}</div>
    </div>
  );
}

export default SectionStructure;
