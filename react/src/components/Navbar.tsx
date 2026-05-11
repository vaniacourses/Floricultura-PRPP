import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, User, Search, Flower, Phone, Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className={"sticky top-0 z-50 w-full bg-rosa-claro text-rosa-text shadow.lg"}>
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto shadow-inner">
        {/* Logo */}
        <NavLink className="flex items-center gap-2 font-bold text-2xl" to="/">
          <Flower size={24} className="mt-2" />
          <span className="text-[38px] font-logo mt-2">tudo são flores</span>
        </NavLink>


        <div className="flex flex-1 mx-12 max-w-2xl relative group">
          <input
            type="text"
            placeholder="Pesquise produtos"
            className="w-full bg-rosa-pastel/50 text-rosa-choque rounded-full px-6 py-3 outline-none placeholder:bg-claro-text shadow-inner focus:ring-2 focus:ring-rosa-pastel transition-all"
          />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-rosa-choque hover:scale-110 transition-transform cursor-pointer">
            <Search size={20} />
          </button>
        </div>

        {/* NavBar Principal */}
        <div className="font-menu flex items-center gap-6 font-medium min-w-fit">
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
          <NavLink
            to="/cliente-login"
            className="flex items-center gap-1 hover:text-rosa-choque transition-colors"
          >
            <User size={20} />
            Minha conta
          </NavLink>
          <NavLink
            to="/carrinho"
            className="flex items-center gap-1 hover:text-rosa-choque transition-colors"
          >
            <ShoppingCart size={20} />
            Carrinho
          </NavLink>
        </div>
      </div>


      {/* Segunda parte da navbar com produtos */}
      <div className="flex items-center justify-center gap-10 py-3 text-sm overflow-x-auto whitespace-nowrap px-6 font-menu border-t border-white/20 bg-rosa-medio/30">
        {[
          { name: "Assinaturas", path: "/assinaturas" },
          { name: "Flores Secas", path: "/flores" },
          { name: "Arranjos", path: "/arranjos" },
          { name: "Buquês", path: "/buques" },
          { name: "Kits", path: "/kits" },
          { name: "Acessórios", path: "/acessorios" },
          { name: "Datas Comemorativas", path: "/datas" },
        ].map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className="relative group hover:text-rosa-choque transition-colors px-2 py-1"
          >
            {item.name}
            {/* Efeito de sublinhado animado que aparece no hover */}
            <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-rosa-choque transition-all duration-300 group-hover:w-full"></span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
export default Navbar;
