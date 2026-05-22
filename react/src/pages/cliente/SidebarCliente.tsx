import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Package, Star, MapPin, LogOut, Trash2 } from "lucide-react";
import { auth } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { api } from "../../services/api";

const SidebarCliente: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setNome(user.displayName || "Cliente");
      setFotoUrl(user.photoURL || "");
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Tem certeza que deseja excluir sua conta permanentemente? Esta ação não pode ser desfeita.")) {
      return;
    }
    try {
      await api.delete("/clientes/me");
      alert("Conta excluída com sucesso.");
      logout();
      navigate("/");
    } catch (error: any) {
      alert("Erro ao excluir conta: " + (error.message || "Tente novamente."));
    }
  };

  const menuItems = [
    { name: "Meu Perfil", path: "/cliente/perfil", icon: <User size={20} /> },
    { name: "Meus Pedidos", path: "/cliente/pedidos", icon: <Package size={20} /> },
    { name: "Minhas Avaliações", path: "/cliente/avaliacoes", icon: <Star size={20} /> },
    { name: "Endereços", path: "/cliente/enderecos", icon: <MapPin size={20} /> },
  ];

  return (
    <aside className="w-72 h-full bg-rosa-claro border-r border-rosa-pastel flex flex-col">
      
      <div className="p-8 text-center">
        <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center overflow-hidden bg-white shadow-inner">
          {fotoUrl ? (
            <img src={fotoUrl} alt="Foto do usuário" className="w-full h-full object-cover" />
          ) : (
            <User size={32} className="text-rosa-choque" />
          )}
        </div>
        <h2 className="text-sm font-bold uppercase tracking-widest text-rosa-choque font-menu mt-2">
          {nome || "Cliente"}
        </h2>
        <p className="text-[10px] uppercase tracking-widest font-bold text-rosa-text opacity-50">
          Cliente VIP
        </p>
      </div>

      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
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
        ))}
      </nav>

     
      <div className="p-4 mt-auto border-t border-rosa-pastel space-y-2">
        <button
          onClick={handleDeleteAccount}
          className="flex w-full items-center gap-4 px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg transition-all font-menu font-semibold cursor-pointer"
        >
          <Trash2 size={20} />
          <span>Excluir Conta</span>
        </button>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-4 px-4 py-3 text-rosa-text hover:text-rosa-choque hover:bg-white/50 rounded-lg transition-all font-menu font-semibold cursor-pointer"
        >
          <LogOut size={20} />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
};

export default SidebarCliente;