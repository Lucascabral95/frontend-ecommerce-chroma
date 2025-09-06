import { ReactNode } from "react";

import SectionStructure from "@/production/Section/SectionStructure";

import "./EstructureCartCheckoutProfile.scss";
import Toast from "@/Shared/Components/Toast";

interface Props {
  children: ReactNode;
  title: string;
  background?: string;
  toast?: { message: string; error: boolean };
}

function EstructureCartCheckoutProfile({
  children,
  title,
  background,
  toast,
}: Props) {
  return (
    <SectionStructure background={background}>
      <div className="estructure-cart-checkout-profile">
        <div className="estructure-cart-checkout-profile__container">
          <div className="cont">
            <div className="title">
              <h2 className="title-text"> {title} </h2>
            </div>
            {children}
            {toast && <Toast message={toast.message} error={toast.error} />}
          </div>
        </div>
      </div>
    </SectionStructure>
  );
}

export default EstructureCartCheckoutProfile;
