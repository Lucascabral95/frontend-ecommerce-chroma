import { ReactNode } from "react";
import { AiOutlineProduct } from "react-icons/ai";
import { FaUserAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";

interface Elements {
  id: number;
  name: string;
  url: string;
  icon: ReactNode;
}

export const elementsDashboard: Elements[] = [
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
