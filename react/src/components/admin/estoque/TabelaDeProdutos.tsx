import React from "react";

const TabelaDeProdutos = ({ produtos, onEditar, onExcluir }) => {
  return (
    <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rosa-pastel">
      <div className="p-6 border-b border-rosa-pastel bg-rosa-pastel/20">
        <h2 className="text-2xl font-bold tracking-tight">Estoque Atual</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-rosa-claro/50 text-rosa-choque uppercase text-xs font-black tracking-widest">
              <th className="p-5">Produto</th>
              <th className="p-5">Categoria</th>
              <th className="p-5">Qtd</th>
              <th className="p-5">Preço</th>
              <th className="p-5 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rosa-pastel/30">
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-rosa-text/60 italic">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr
                  key={produto.codigo}
                  className="hover:bg-rosa-claro/30 transition-colors group"
                >
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-rosa-claro flex-shrink-0 border border-rosa-pastel">
                        {produto.imagem ? (
                          <img
                            src={produto.imagem}
                            alt={produto.nome}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-rosa-choque/50">
                            N/A
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-rosa-text">
                        {produto.nome}
                      </span>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 bg-rosa-pastel text-rosa-choque text-xs font-bold rounded-full">
                      {produto.categoria}
                    </span>
                  </td>
                  <td className="p-5 font-medium">{produto.quantidade}</td>
                  <td className="p-5 font-bold text-rosa-choque">
                    R$ {Number(produto.preco).toFixed(2)}
                  </td>
                  <td className="p-5">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => onEditar(produto)}
                        className="p-2 text-rosa-text hover:bg-rosa-medio hover:text-white rounded-lg transition-all"
                        title="Editar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => onExcluir(produto.codigo)}
                        className="p-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                        title="Excluir"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TabelaDeProdutos;