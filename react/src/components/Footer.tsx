import { Flower } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-rosa-choque text-rosa-claro">
      <div className="flex items-center justify-center py-6 border-b border-rosa-pastel/20">
        <div className="h-px w-24 bg-rosa-pastel/30" />
        <Flower size={20} className="mx-4 text-rosa-pastel" />
        <div className="h-px w-24 bg-rosa-pastel/30" />
      </div>

      <div className="max-w-5xl mx-auto px-6 py-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
        {/* Coluna 1 — Logo e descrição */}
        <div className="flex flex-col gap-3">
          <span className="font-logo text-4xl text-white">Tudo são flores</span>
          <p className="text-rosa-pastel/80 text-sm leading-relaxed">
            Trabalho prático <br/>
            Projeto de Software (UFF, 2026.1) 
          </p>
        </div>

        {/* Coluna 2 — Navegação */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-1">
            Navegação
          </h3>
          {[
            { label: "Home", to: "/" },
            { label: "Assinaturas", to: "/assinaturas" },
            { label: "Contato", to: "/contato" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-rosa-pastel/80 hover:text-white text-sm transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Coluna 3 — Categorias */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold text-sm uppercase tracking-widest mb-1">
            Produtos
          </h3>
          {[
            { label: "Flores", to: "/flores" },
            { label: "Flores Secas", to: "/flores-secas" },
            { label: "Arranjos", to: "/arranjos" },
            { label: "Buquês", to: "/buques" },
            { label: "Kits", to: "/kits" },
            { label: "Acessórios", to: "/acessorios" },
            { label: "Eventos", to: "/eventos" },
          ].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-rosa-pastel/80 hover:text-white text-sm transition-colors duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="border-t border-rosa-pastel/20 py-3 text-center">
        <p className="text-rosa-pastel/60 text-xs">
          © 2026 Tudo são Flores · Projeto fictício desenvolvido na{" "}
          <a
            href="https://github.com/vaniacourses/Floricultura-PRPP"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rosa-pastel transition-colors duration-200"
          >
            UFF – PRPP
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
