import { IoMdClose } from "react-icons/io";

import "./StructureModal.scss";

interface Props {
  close: () => void;
  title: string;
  children: React.ReactNode;
}

function StructureModal({ close, title, children }: Props) {
  return (
    <div className="structure-modal">
      <div className="structure-modal__container">
        <div className="button-close">
          <button onClick={close}>
            <IoMdClose className="icon" />
          </button>
        </div>
        <div className="title">
          <h2> {title} </h2>
        </div>
        <div className="form-content-inside">{children}</div>
      </div>
    </div>
  );
}

export default StructureModal;
