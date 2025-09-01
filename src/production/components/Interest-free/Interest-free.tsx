"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SectionStructure from "@/production/Section/SectionStructure";

import "./interest-free.scss";

function InterestFree() {
  const [widthDynamic, setWidthDynamic] = useState(window.innerWidth);

  const bpMd = 768;

  useEffect(() => {
    const handleResize = () => setWidthDynamic(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const imageSrc: string =
    widthDynamic > bpMd
      ? "/img/6-cuotas-s-interes.webp"
      : "/img/quotas-without-interest-mobile.webp";

  return (
    <SectionStructure>
      <div className="interestFree">
        <Image
          src={imageSrc}
          alt="Interest Free"
          width={widthDynamic > bpMd ? 1920 : 1024}
          height={80}
          quality={100}
          className="imageInterestFree"
        />
      </div>
    </SectionStructure>
  );
}

export default InterestFree;
