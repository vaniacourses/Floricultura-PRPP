import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  User,
  Search,
  Flower,
  Phone,
  Home,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const categorias = [
  { name: "Assinaturas", path: "/assinaturas" },
  { name: "Flores", path: "/flores" },
  { name: "Flores Secas", path: "/flores-secas" },
  { name: "Arranjos", path: "/arranjos" },
  { name: "Buquês", path: "/buques" },
  { name: "Kits", path: "/kits" },
  { name: "Acessórios", path: "/acessorios" },
];

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const getRole = (): string | null => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    try {
      const payloadBase64 = token.split(".")[1];
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);
      return payload.role || null;
    } catch (e) {
      console.error("Erro ao decodificar token", e);
      return null;
    }
  };

  const role = getRole();
  const isAdmin =
    role === "GERENTE" || role === "ATENDENTE" || role === "SUPER_ADMIN";
  const contaLink = isAdmin ? "/admin/perfil-adm" : "/cliente/perfil";
  const contaTexto = isAdmin ? "Painel Admin" : "Minha Conta";

  const fecharMenu = () => setMenuAberto(false);

  return (
    <nav className="sticky top-0 z-50 w-full bg-rosa-claro text-rosa-text shadow-lg">
      {/* ── Barra principal ── */}
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto gap-4">
        {/* Logo */}
        <NavLink
          className="flex items-center gap-2 font-bold text-2xl shrink-0"
          to="/"
          onClick={fecharMenu}
        >
          <Flower size={24} className="mt-2" />
          <span className="text-[38px] font-logo mt-2 hidden sm:inline">
            tudo são flores
          </span>
        </NavLink>

        {/* Barra de busca — some em telas muito pequenas */}
        <div className="hidden sm:flex flex-1 mx-6 max-w-2xl relative">
          <input
            type="text"
            placeholder="Pesquise produtos"
            className="w-full bg-rosa-pastel/50 text-rosa-choque rounded-full px-6 py-3 outline-none placeholder:text-rosa-text/50 shadow-inner focus:ring-2 focus:ring-rosa-pastel transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-rosa-choque hover:scale-110 transition-transform cursor-pointer">
            <Search size={20} />
          </button>
        </div>

        {/* Links desktop */}
        <div className="font-menu hidden md:flex items-center gap-6 font-medium shrink-0">
          <NavLink
            to="/home"
            className="flex items-center gap-1 hover:text-rosa-choque transition-colors"
          >
            <Home size={20} />
            Home
          </NavLink>
          <NavLink
            to="/contato"
            className="flex items-center gap-1 hover:text-rosa-choque transition-colors"
          >
            <Phone size={20} />
            Contato
          </NavLink>
          {isAuthenticated ? (
            <NavLink
              to={contaLink}
              className="flex items-center gap-1 hover:text-rosa-choque transition-colors"
            >
              <User size={20} />
              {contaTexto}
            </NavLink>
          ) : (
            <NavLink
              to="/cliente-login"
              className="flex items-center gap-1 hover:text-rosa-choque transition-colors"
            >
              <User size={20} />
              Fazer Login
            </NavLink>
          )}
          <NavLink
            to="/carrinho"
            className="flex items-center gap-1 hover:text-rosa-choque transition-colors"
          >
            <ShoppingCart size={20} />
            Carrinho
          </NavLink>
        </div>

        {/* Ícones compactos mobile (carrinho + hambúrguer) */}
        <div className="flex items-center gap-3 md:hidden">
          <NavLink to="/carrinho" aria-label="Carrinho">
            <ShoppingCart size={22} className="hover:text-rosa-choque transition-colors" />
          </NavLink>
          <button
            aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuAberto((v) => !v)}
            className="hover:text-rosa-choque transition-colors"
          >
            {menuAberto ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ── Barra de busca mobile (linha separada) ── */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <input
            type="text"
            placeholder="Pesquise produtos"
            className="w-full bg-rosa-pastel/50 text-rosa-choque rounded-full px-5 py-2.5 outline-none placeholder:text-rosa-text/50 shadow-inner focus:ring-2 focus:ring-rosa-pastel transition-all text-sm"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-rosa-choque">
            <Search size={18} />
          </button>
        </div>
      </div>

      {/* ── Subcategorias desktop ── */}
      <div className="hidden md:flex items-center justify-center gap-16 py-3 text-sm overflow-x-auto whitespace-nowrap px-6 font-menu border-t border-white/20 bg-rosa-medio/30">
        {categorias.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="relative group hover:text-rosa-choque transition-colors px-2 py-1"
          >
            {item.name}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-rosa-choque transition-all duration-300 group-hover:w-full" />
          </NavLink>
        ))}
      </div>

      {/* ── Menu mobile (gaveta) ── */}
      {menuAberto && (
        <div className="md:hidden border-t border-white/20 bg-rosa-claro font-menu">
          {/* Links principais */}
          <div className="flex flex-col px-6 py-4 gap-4 border-b border-rosa-pastel/40">
            <NavLink
              to="/home"
              onClick={fecharMenu}
              className="flex items-center gap-2 hover:text-rosa-choque transition-colors"
            >
              <Home size={18} />
              Home
            </NavLink>
            <NavLink
              to="/contato"
              onClick={fecharMenu}
              className="flex items-center gap-2 hover:text-rosa-choque transition-colors"
            >
              <Phone size={18} />
              Contato
            </NavLink>
            {isAuthenticated ? (
              <NavLink
                to={contaLink}
                onClick={fecharMenu}
                className="flex items-center gap-2 hover:text-rosa-choque transition-colors"
              >
                <User size={18} />
                {contaTexto}
              </NavLink>
            ) : (
              <NavLink
                to="/cliente-login"
                onClick={fecharMenu}
                className="flex items-center gap-2 hover:text-rosa-choque transition-colors"
              >
                <User size={18} />
                Fazer Login
              </NavLink>
            )}
          </div>

          {/* Categorias */}
          <div className="grid grid-cols-2 px-6 py-4 gap-3">
            {categorias.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={fecharMenu}
                className="text-sm py-2 px-3 rounded-full bg-rosa-pastel/30 text-center hover:bg-rosa-pastel hover:text-rosa-choque transition-colors"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
