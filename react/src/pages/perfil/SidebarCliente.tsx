import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { User, Package, Star, MapPin } from "lucide-react";
import { auth } from "../../config/firebase"; // ajuste o caminho conforme seu projeto

const SidebarCliente: React.FC = () => {
  const [nome, setNome] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setNome(user.displayName || "Cliente");
      setFotoUrl(user.photoURL || "");
    }
  }, []);

  const menuItems = [
    { name: "Meu Perfil", path: "/cliente/perfil", icon: <User size={20} /> },
    { name: "Meus Pedidos", path: "/cliente/pedidos", icon: <Package size={20} /> },
    { name: "Minhas Avaliações", path: "/cliente/avaliacoes", icon: <Star size={20} /> },
    { name: "Endereços", path: "/cliente/enderecos", icon: <MapPin size={20} /> },
  ];

  return (
    <aside className="w-80 bg-white border-r border-rosa-pastel flex flex-col sticky top-0 h-screen shadow-sm">
      {/* Header da Sidebar */}
      <div className="p-10 text-center">
        <div className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center shadow-inner overflow-hidden bg-rosa-claro">
          {fotoUrl ? (
            <img src={fotoUrl} alt="Foto do usuário" className="w-full h-full object-cover" />
          ) : (
            <User size={40} className="text-rosa-choque" />
          )}
        </div>
        <h2 className="text-lg font-black text-rosa-text leading-tight uppercase">
          Olá, {nome || "Cliente"}!
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-rosa-text opacity-50">
          Cliente VIP
        </p>
      </div>

      {/* Navegação */}
      <nav className="flex-1 px-6 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-bold ${
                isActive
                  ? "bg-rosa-choque text-white shadow-lg shadow-rosa-choque/20 scale-105"
                  : "text-rosa-text hover:bg-rosa-claro hover:text-rosa-choque"
              }`
            }
          >
            {item.icon}
            <span className="text-[15px]">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Footer da Sidebar vazio, removido o botão de sair */}
    </aside>
  );
};

export default SidebarCliente;