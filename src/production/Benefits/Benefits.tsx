import React from "react";

import "./Benefits.scss";

import SectionStructure from "../Section/SectionStructure";
import { FiTruck } from "react-icons/fi";
import { MdOutlineStorefront } from "react-icons/md";
import { FaRegCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import BenefitsMobile from "./BenefitsMobile";

interface Benefits {
  icon: React.ReactNode;
  title: string;
  detail: string;
}

function Benefits() {
  const benefits: Benefits[] = [
    {
      icon: <FiTruck className="icon-benefit" />,
      title: "ENVÍOS GRATIS A TODO EL PAÍS",
      detail: "en compras superiores a $79.999",
    },
    {
      icon: <MdOutlineStorefront className="icon-benefit" />,
      title: "RETIRO EN TIENDA",
      detail: "Elegí tu tienda más cercana",
    },
    {
      icon: <FaRegCircleCheck className="icon-benefit" />,
      title: "COMPRA 100% SEGURA",
      detail: "Tu información segura y garantizada",
    },
  ];

  return (
    <>
      <section className="info-ecomerce">
        <SectionStructure>
          <div className="benefits">
            <div className="benefits__container">
              {benefits.map((benefit, index) => (
                <div className="benefit-div" key={index}>
                  <div className="icon">{benefit.icon}</div>
                  <div className="benefit-title">
                    <p>{benefit.title}</p>
                  </div>
                  <div className="benefit-detail">
                    <p>{benefit.detail}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="locals">
              <Link href="/">
                <Image
                  src="/img/locales-store.webp"
                  alt="Locales"
                  width={1200}
                  height={300}
                  className="image-locals"
                />
              </Link>
            </div>
          </div>
        </SectionStructure>
      </section>
      <BenefitsMobile benefits={benefits} />
    </>
  );
}

export default Benefits;
