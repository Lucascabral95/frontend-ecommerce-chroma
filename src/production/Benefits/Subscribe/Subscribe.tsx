"use client";
import SectionStructure from "@/production/Section/SectionStructure";
import { useState } from "react";
import { FiSend } from "react-icons/fi";

import "./Subscribe.scss";

function Subscribe() {
  const [email, setEmail] = useState("");

  const sendEmail = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    try {
      console.log(`Correo enviado satisfactoriamente!`);
      setEmail("");
    } catch (error) {
      console.log(`${error}`);
    }
  };

  return (
    <div className="subscribe">
      <SectionStructure>
        <div className="subscribe__container">
          <div className="detail">
            <div className="text">
              <p className="detail-text">
                Suscribite para recibir novedades y promociones
              </p>
            </div>
          </div>
          <div className="input-subscribe">
            <div className="in">
              <input
                className="input"
                type="email"
                placeholder="Ingresá tu dirección de correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="icon" onClick={(e) => sendEmail(e)}>
              <FiSend className="icon-send" />
            </div>
          </div>
        </div>
      </SectionStructure>
    </div>
  );
}

export default Subscribe;
