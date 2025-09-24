"use client";
import { ReactNode, useCallback, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import useAuthStore from "@/lib/zustand/AuthZustand";
import { elementsDashboard } from "@/Shared/Constants/ElementsDashboard";
import "./StructureDashboard.scss";

interface Props {
  children: ReactNode;
  title: string;
}

const TIMEOUT_LOGOUT = 1200;

function StructureDashboard({ children, title }: Props) {
  const elementsMemo = useMemo(() => elementsDashboard, []);
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
  }, [logout, router]);

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
