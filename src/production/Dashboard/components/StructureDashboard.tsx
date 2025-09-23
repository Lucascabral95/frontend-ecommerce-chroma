"use client";
import { ReactNode, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { AiOutlineProduct } from "react-icons/ai";
import { MdCategory } from "react-icons/md";

import "./StructureDashboard.scss";
import useAuthStore from "@/lib/zustand/AuthZustand";

interface Props {
  children: ReactNode;
  title: string;
}

interface Elements {
  id: number;
  name: string;
  url: string;
  icon: ReactNode;
}

const elements: Elements[] = [
  {
    id: 1,
    name: "Usuarios",
    url: "/api/dashboard/usuarios",
    icon: <FaUserAlt className="icon" />,
  },
  {
    id: 2,
    name: "Productos",
    url: "/api/dashboard/productos",
    icon: <AiOutlineProduct className="icon" />,
  },
  {
    id: 3,
    name: "Categorias",
    url: "/api/dashboard/categorias",
    icon: <MdCategory className="icon" />,
  },
];

const TIMEOUT_LOGOUT = 1200;

function StructureDashboard({ children, title }: Props) {
  const elementsMemo = useMemo(() => elements, []);
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuthStore();

  const isActiveRoute = (url: string): boolean => {
    return pathname === url || pathname.startsWith(`${url}/`);
  };

  const handleLogout = useCallback(() => {
    logout();
    setTimeout(() => {
      router.push("/");
    }, TIMEOUT_LOGOUT);
  }, []);

  return (
    <div className="structure-dashboard">
      <div className="structure-dashboard__container">
        <div className="panel-dashboard">
          <div className="e">
            <Link href="/" className="link-title">
              <h2 className="link-title__title"> Chroma </h2>
            </Link>
            <div className="elements-logout">
              <div className="elements">
                {elementsMemo.map((element, index) => (
                  <Link
                    href={element.url}
                    className={
                      isActiveRoute(element.url) ? "element active" : "element"
                    }
                    key={index}
                  >
                    <div className="icono">{element.icon}</div>
                    {element.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="button-logout" onClick={handleLogout}>
            <button>Logout</button>
          </div>
        </div>
        <div className="content-dashboard">
          <h3> {title} </h3>
          {children}
        </div>
      </div>
    </div>
  );
}

export default StructureDashboard;
