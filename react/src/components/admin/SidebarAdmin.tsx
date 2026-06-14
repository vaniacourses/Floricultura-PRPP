import React from "react";
import { BarChart3, ClipboardList, LogOut, Package, Tag, User, ShieldCheck, LayoutGrid } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const SidebarAdmin = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const getRole = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payloadBase64 = token.split('.')[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.role || null;
    } catch (e) {
      console.error("Erro ao decodificar token", e);
      return null;
    }
  };

  const role = getRole();

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  const menuItems = [
    { name: "Meu Perfil", path: "perfil-adm", icon: <User size={20} /> },
    { name: "Dashboard", path: "dashboard", icon: <LayoutGrid size={20} /> },
    { name: "Reservas", path: "reservas", icon: <ClipboardList size={20} /> },
    { name: "PedidosClientes", path: "pedidos-clientes", icon: <ClipboardList size={20} /> },
    { name: "Estoque", path: "estoque", icon: <Package size={20} /> },
    { name: "Promoções", path: "promocoes", icon: <Tag size={20} /> },
    { name: "Relatórios", path: "relatorios", icon: <BarChart3 size={20} /> },
    { name: "Administradores", path: "administradores", icon: <ShieldCheck size={20} /> },
  ];

  return (
    <aside className="w-72 h-full bg-rosa-claro border-r border-rosa-pastel flex flex-col">
      <div className="p-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-rosa-choque font-menu">
          Menu Admin
        </h2>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => {
          if (item.path === "administradores" && role !== "SUPER_ADMIN") {
            return null;
          }
          return (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-300 font-menu font-semibold ${
                  isActive
                    ? "bg-rosa-choque text-white shadow-md shadow-rosa-choque/20"
                    : "text-rosa-text hover:bg-rosa-medio/20 hover:text-rosa-choque"
                }`
              }
            >
              {item.icon}
              <span className="text-[15px]">{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      <div className="p-4 mt-auto border-t border-rosa-pastel">
        <button
          onClick={handleLogout}
          type="button"
          className="flex w-full items-center gap-4 px-4 py-3 text-rosa-text hover:text-rosa-choque hover:bg-white/50 rounded-lg transition-all font-menu font-semibold cursor-pointer"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarAdmin;
