import React from "react";
import Marquee from "react-fast-marquee";
import "./Marquee.scss";

const text: string =
  "RETIRO EN TIENDA SIN CARGO | ENVÍO GRATIS A PARTIR DE $110.000 | 3 CUOTAS SIN INTERÉS EN TODAS TUS COMPRAS | 6 CUOTAS SIN INTERÉS EN COMPRAS SUPERIORES A $110.000";

function MarqueeBanner() {
  return (
    <section
      className="marquee"
      role="marquee"
      aria-label="Promociones y beneficios"
    >
      <div className="marquee__container">
        <Marquee
          speed={100}
          gradient={false}
          pauseOnHover={false}
          pauseOnClick={false}
          autoFill
        >
          <strong>{text}</strong>
        </Marquee>
      </div>
    </section>
  );
}

export default MarqueeBanner;
