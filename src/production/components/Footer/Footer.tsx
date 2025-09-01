import React from "react";

import SectionStructure from "@/production/Section/SectionStructure";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";

import "./Footer.scss";

interface Socials {
  href: string;
  icon: React.ReactNode;
}

function Footer() {
  const redes: Record<string, string> = {
    github: "https://github.com/Lucascabral95",
    linkedin: "https://www.linkedin.com/in/lucas-gast%C3%B3n-cabral/",
    portfolio:
      "https://portfolio-web-dev-git-main-lucascabral95s-projects.vercel.app/",
    instagram: "https://instagram.com/lucascabral95",
  };

  const socials: Socials[] = [
    {
      href: redes.github,
      icon: <FaGithub className="icon" />,
    },
    {
      href: redes.linkedin,
      icon: <FaLinkedin className="icon" />,
    },
    {
      href: redes.portfolio,
      icon: <BiWorld className="icon" />,
    },
    {
      href: redes.instagram,
      icon: <FaInstagram className="icon" />,
    },
  ];

  return (
    <div className="foot">
      <SectionStructure>
        <footer className="footer">
          <div className="footer__container">
            <div className="social-networks">
              {socials.map((social, index) => (
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social"
                  key={index}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </SectionStructure>
      <div className="divididor"></div>
      <SectionStructure>
        <div className="me">
          <p>
            Desarrollado con <span>❤</span> por
            <a
              href={redes.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="link"
            >
              Lucas Cabral
            </a>
          </p>
        </div>
      </SectionStructure>
    </div>
  );
}

export default Footer;
