import React from "react";
import { NavLink } from "react-router-dom";
import { ShoppingCart, User, Search, Flower, Phone, Home } from "lucide-react";

const Navbar = () => {
  return (
    <nav className={"bg-rosa-choque text-rosa-claro p-4"}>
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink className="flex items-center gap-2 font-bold text-2xl" to="/">
          <Flower size={28} />
          <span className="text-[55px] font-logo">tudo são flores</span>
        </NavLink>

        <div className="flex flex-1 mx-12 max-w-2xl relative">
          <input
            type="text"
            placeholder="Pesquise produtos"
            className="w-full bg-rosa-claro text-rosa-choque rounded-full px-5 py-2 outline-none placeholder:text-rosa-choque/60"
          />
          <button className="absolute right-4 top-2 text-rosa-choque">
            <Search size={20} />
          </button>
        </div>

        {/* NavBar Principal */}
        <div className="font-menu flex items-center gap-6 font-medium min-w-fit">
          <NavLink
            to="/home"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Home size={20} />
            Home
          </NavLink>
          <NavLink
            to="/contato"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <Phone size={20} />
            Contato
          </NavLink>
          <NavLink
            to="/usuario"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <User size={20} />
            Minha conta
          </NavLink>
          <NavLink
            to="/carrinho"
            className="flex items-center gap-1 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            Carrinho
          </NavLink>
        </div>
      </div>

      <hr />

      {/* Segunda parte da navbar com produtos */}
      <div className="flex items-center justify-center gap-14 py-3 text-sm overflow-x-auto whitespace-nowrap px-6 font-menu">
        <NavLink className="hover:text-white transition-colors" to="/assinaturas">Assinaturas</NavLink>
        <NavLink className="hover:text-white transition-colors" to="/flores">Flores Secas</NavLink>
        <NavLink className="hover:text-white transition-colors" to="/arranjos">Arranjos</NavLink>
        <NavLink className="hover:text-white transition-colors" to="/buques">Buquês</NavLink>
        <NavLink className="hover:text-white transition-colors" to="/kits">Kits</NavLink>
        <NavLink className="hover:text-white transition-colors" to="/acessorios">Acessórios</NavLink>
        <NavLink className="hover:text-white transition-colors" to="/datas">Datas Comemorativas</NavLink>
        <NavLink className="hover:text-white transition-colors" to="/eventos">Eventos</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
