import React from "react";

const FiltroEstoque = ({ valor, onBuscaChange }) => {
  return (
    <div className="mb-6 flex justify-end">
      <div className="relative w-full md:w-72">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={valor}
          onChange={(e) => onBuscaChange(e.target.value)}
          className="w-full p-3 pl-10 border-2 border-rosa-pastel rounded-full focus:border-rosa-medio outline-none transition-all bg-white"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 absolute left-3 top-3.5 text-rosa-choque/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
    </div>
  );
};

export default FiltroEstoque;