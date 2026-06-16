import React, { useEffect, useState, useRef } from "react";
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
  Loader2,
  Bell,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import axios from "axios";

const categorias = [
  { name: "Assinaturas", path: "/assinaturas" },
  { name: "Flores", path: "/flores" },
  { name: "Flores Secas", path: "/flores-secas" },
  { name: "Arranjos", path: "/arranjos" },
  { name: "Buquês", path: "/buques" },
  { name: "Kits", path: "/kits" },
  { name: "Eventos", path: "/eventos" },
  { name: "Acessórios", path: "/acessorios" },
];

type ProdutoApi = {
  codigo: number;
  nome: string;
  preco: number;
  imagem: string;
};

const removeAcentos = (str: string) =>
  str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [menuAberto, setMenuAberto] = useState(false);

  const [termoBusca, setTermoBusca] = useState("");
  const [todosProdutos, setTodosProdutos] = useState<ProdutoApi[]>([]);
  const [resultados, setResultados] = useState<ProdutoApi[]>([]);
  const [mostrarDropdown, setMostrarDropdown] = useState(false);
  const [carregandoCache, setCarregandoCache] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [notificacoes, setNotificacoes] = useState<any[]>([]);
  const [menuNotifAberto, setMenuNotifAberto] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
  const isAdmin = role === "GERENTE" || role === "ATENDENTE" || role === "SUPER_ADMIN";
  const contaLink = isAdmin ? "/admin/perfil-adm" : "/cliente/perfil";
  const contaTexto = isAdmin ? "Painel Admin" : "Minha Conta";

  const fecharMenu = () => setMenuAberto(false);

  useEffect(() => {
    setCarregandoCache(true);
    api
      .get<ProdutoApi[]>("/produtos")
      .then((response) => setTodosProdutos(response))
      .catch((err) => console.error("Erro ao carregar produtos:", err))
      .finally(() => setCarregandoCache(false));
  }, []);

  useEffect(() => {
    if (!termoBusca.trim()) {
      setResultados([]);
      setMostrarDropdown(false);
      return;
    }
    const termo = removeAcentos(termoBusca.toLowerCase());
    const filtrados = todosProdutos.filter((p) =>
      removeAcentos(p.nome.toLowerCase()).includes(termo)
    );
    setResultados(filtrados.slice(0, 6));
    setMostrarDropdown(filtrados.length > 0);
  }, [termoBusca, todosProdutos]);

  useEffect(() => {
    if (!isAuthenticated) return;

    const token = localStorage.getItem("token");
    if (token) {
      try {
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const dadosToken = JSON.parse(window.atob(base64));
        const usuarioId = dadosToken.usuarioId;

        if (!usuarioId || isNaN(usuarioId)) return;

        axios.get(`http://localhost:8080/api/notificacoes/usuario/${usuarioId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setNotificacoes(response.data);
        })
        .catch((error) => console.error("Erro ao buscar notificações", error));
      } catch (err) {
        console.error("Erro ao ler token no sininho", err);
      }
    }
  }, [isAuthenticated]);

  const marcarComoLida = (idNotificacao: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios.put(`http://localhost:8080/api/notificacoes/${idNotificacao}/ler`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(() => {
      setNotificacoes((prev) => prev.filter((n) => n.idNotificacao !== idNotificacao));
    })
    .catch((error) => console.error("Erro ao marcar notificação como lida", error));
  };

  useEffect(() => {
    const fecharAoClicarFora = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuNotifAberto(false);
      }
    };
    document.addEventListener("mousedown", fecharAoClicarFora);
    return () => document.removeEventListener("mousedown", fecharAoClicarFora);
  }, []);

  const handleProdutoClick = (produto: ProdutoApi) => {
    navigate(`/detalhesPage/${produto.codigo}`);
    setTermoBusca("");
    setMostrarDropdown(false);
    fecharMenu();
  };

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const termo = termoBusca.trim();
    if (termo) {
      navigate(`/busca?q=${encodeURIComponent(termo)}`);
      setMostrarDropdown(false);
      fecharMenu();
    }
  };

  const handleBlur = () => {
    setTimeout(() => setMostrarDropdown(false), 150);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-rosa-claro text-rosa-text shadow-lg">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <NavLink className="flex items-center gap-2 font-bold text-2xl" to="/" onClick={fecharMenu}>
          <Flower size={24} className="mt-2" />
          <span className="text-[38px] font-logo mt-2 hidden sm:inline">
            tudo são flores
          </span>
        </NavLink>

        <div className="hidden sm:flex flex-1 mx-6 max-w-2xl relative">
          <form onSubmit={handleSearchSubmit} className="w-full">
            <input
              ref={inputRef}
              type="text"
              placeholder="Pesquise produtos"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              onFocus={() => termoBusca.trim() && setMostrarDropdown(true)}
              onBlur={handleBlur}
              className="w-full bg-rosa-pastel/50 text-rosa-choque rounded-full px-6 py-3 outline-none placeholder:text-rosa-text/50 shadow-inner focus:ring-2 focus:ring-rosa-pastel transition-all"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-rosa-choque hover:scale-110 transition-transform cursor-pointer"
            >
              {carregandoCache ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                <Search size={20} />
              )}
            </button>
          </form>

          {mostrarDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-3xl shadow-2xl border border-rosa-pastel overflow-hidden z-50">
              {resultados.map((produto) => (
                <button
                  key={produto.codigo}
                  onMouseDown={() => handleProdutoClick(produto)}
                  className="w-full flex items-center gap-4 px-5 py-3 hover:bg-rosa-claro transition-colors text-left"
                >
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-rosa-text text-sm truncate">
                      {produto.nome}
                    </p>
                    <p className="text-rosa-choque font-black text-xs">
                      R$ {produto.preco.toFixed(2)}
                    </p>
                  </div>
                </button>
              ))}
              <div className="border-t border-rosa-pastel/50">
                <button
                  onMouseDown={handleSearchSubmit}
                  className="w-full px-5 py-3 text-sm text-rosa-choque font-bold hover:bg-rosa-claro transition-colors text-center"
                >
                  Ver todos os resultados para “{termoBusca}”
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="font-menu hidden md:flex items-center gap-6 font-medium shrink-0">
          <NavLink to="/home" className="flex items-center gap-1 hover:text-rosa-choque transition-colors">
            <Home size={20} />
            Home
          </NavLink>
          
          <NavLink to="/contato" className="flex items-center gap-1 hover:text-rosa-choque transition-colors">
            <Phone size={20} />
            Contato
          </NavLink>

          {isAuthenticated ? (
            <NavLink to={contaLink} className="flex items-center gap-1 hover:text-rosa-choque transition-colors">
              <User size={20} />
              {contaTexto}
            </NavLink>
          ) : (
            <NavLink to="/cliente-login" className="flex items-center gap-1 hover:text-rosa-choque transition-colors">
              <User size={20} />
              Fazer Login
            </NavLink>
          )}

          <NavLink to="/carrinho" className="flex items-center gap-1 hover:text-rosa-choque transition-colors">
            <ShoppingCart size={20} />
            Carrinho
          </NavLink>

          {isAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setMenuNotifAberto(!menuNotifAberto)}
                className="flex items-center gap-2 hover:text-rosa-choque transition-colors cursor-pointer relative p-1"
              >
                <div className="relative">
                  <Bell size={20} />
                  {notificacoes.length > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white font-bold text-[10px] w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                      {notificacoes.length}
                    </span>
                  )}
                </div>
                <span>Notificações</span>
              </button>

              {menuNotifAberto && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-rosa-pastel py-2 text-gray-700 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 font-semibold text-rosa-choque">
                    Notificações
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notificacoes.length === 0 ? (
                      <div className="px-4 py-6 text-center text-sm text-gray-400">
                        Nenhuma nova notificação
                      </div>
                    ) : (
                      notificacoes.map((notif, index) => (
                        <div 
                          key={notif.idNotificacao || index} 
                          onClick={() => marcarComoLida(notif.idNotificacao)}
                          className="px-4 py-3 border-b border-gray-50 hover:bg-rosa-pastel/10 transition-colors cursor-pointer"
                        >
                          <p className="text-sm font-medium text-gray-800">
                            {notif.mensagem}
                          </p>
                          <span className="text-[10px] text-gray-400 block mt-1">
                            {notif.dataEnvio ? new Date(notif.dataEnvio).toLocaleDateString() : "Agora"}
                          </span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

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

      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Pesquise produtos"
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              onFocus={() => termoBusca.trim() && setMostrarDropdown(true)}
              onBlur={handleBlur}
              className="w-full bg-rosa-pastel/50 text-rosa-choque rounded-full px-5 py-2.5 outline-none placeholder:text-rosa-text/50 shadow-inner focus:ring-2 focus:ring-rosa-pastel transition-all text-sm"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-rosa-choque">
              {carregandoCache ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Search size={18} />
              )}
            </button>
          </form>
        </div>
      </div>

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

      {menuAberto && (
        <div className="md:hidden border-t border-white/20 bg-rosa-claro font-menu">
          <div className="flex flex-col px-6 py-4 gap-4 border-b border-rosa-pastel/40">
            <NavLink to="/home" onClick={fecharMenu} className="flex items-center gap-2 hover:text-rosa-choque transition-colors">
              <Home size={18} />
              Home
            </NavLink>
            <NavLink to="/contato" onClick={fecharMenu} className="flex items-center gap-2 hover:text-rosa-choque transition-colors">
              <Phone size={18} />
              Contato
            </NavLink>
            {isAuthenticated ? (
              <NavLink to={contaLink} onClick={fecharMenu} className="flex items-center gap-2 hover:text-rosa-choque transition-colors">
                <User size={18} />
                {contaTexto}
              </NavLink>
            ) : (
              <NavLink to="/cliente-login" onClick={fecharMenu} className="flex items-center gap-2 hover:text-rosa-choque transition-colors">
                <User size={18} />
                Fazer Login
              </NavLink>
            )}
          </div>

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
