import React from "react";

const CATEGORIAS = [
  { valor: "", label: "Todos" },
  { valor: "FLORES", label: "Flores" },
  { valor: "FLORES_SECAS", label: "Flores secas" },
  { valor: "ARRANJOS", label: "Arranjos" },
  { valor: "BUQUES", label: "Buquês" },
  { valor: "KITS", label: "Kits" },
  { valor: "CARTOES", label: "Cartões" },
];

const FiltroCategoria = ({ categoriaAtiva, onCategoriaChange }) => {
  return (
    <div className="mb-4">
      <p className="text-xs text-rosa-text/50 uppercase tracking-widest font-bold mb-3">
        Filtrar por categoria
      </p>
      <div className="flex flex-wrap gap-2">
        {CATEGORIAS.map((cat) => (
          <button
            key={cat.valor}
            onClick={() => onCategoriaChange(cat.valor)}
            className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition-all ${
              categoriaAtiva === cat.valor
                ? "bg-rosa-pastel border-rosa-choque text-rosa-choque"
                : "bg-white border-rosa-pastel text-rosa-text/70 hover:border-rosa-choque/50 hover:text-rosa-text"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FiltroCategoria;