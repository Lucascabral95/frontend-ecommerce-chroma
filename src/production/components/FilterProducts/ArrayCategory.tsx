import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import "./FilterProducts.scss";
import { ReactNode, useState } from "react";

interface Props {
  idem: string;
  children?: ReactNode;
}

function ArrayCategory({ idem, children }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div className="category">
      <div className="title-title-category" onClick={() => setOpen(!open)}>
        <div className="title">
          <p className="text"> {idem} </p>
        </div>
        <div className="icono">
          {open ? (
            <IoIosArrowUp className="icon" />
          ) : (
            <IoIosArrowDown className="icon" />
          )}
        </div>
      </div>
      <div className="values" style={{ display: open ? "block" : "none" }}>
        {children}
      </div>
    </div>
  );
}

export default ArrayCategory;
