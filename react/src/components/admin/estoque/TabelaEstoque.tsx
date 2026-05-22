import React from "react";

// Recebemos categoriaAtiva via props junto com as funções de ação
const TabelaEstoque = ({ produtos, categoriaAtiva, onEditar, onExcluir }) => {
  // Função para renderizar os CABEÇALHOS (<th>) dinâmicos
  const renderCabecalhosEspecificos = () => {
    switch (categoriaAtiva) {
      case "FLORES":
        return (
          <>
            <th className="p-5 text-left font-black">Validade</th>
            <th className="p-5 text-left font-black">Un. Medida</th>
          </>
        );
      case "FLORES_SECAS":
        return (
          <>
            <th className="p-5 text-left font-black">Validade</th>
            <th className="p-5 text-left font-black">Un. Medida</th>
            <th className="p-5 text-left font-black">Proc. Secagem</th>
          </>
        );
      case "ARRANJOS":
        return (
          <>
            <th className="p-5 text-left font-black">Validade</th>
            <th className="p-5 text-left font-black">Vaso</th>
          </>
        );
      case "BUQUES":
        return (
          <>
            <th className="p-5 text-left font-black">Validade</th>
            <th className="p-5 text-left font-black">Tamanho</th>
          </>
        );
      case "CARTOES":
        return (
          <>
            <th className="p-5 text-left font-black">Tema</th>
            <th className="p-5 text-left font-black">Dimensões</th>
          </>
        );
      case "KITS":
        return <th className="p-5 text-left font-black">Tema</th>;
      default:
        return null; // "Todos" não mostra colunas extras
    }
  };

  // Função para renderizar as CÉLULAS (<td>) dinâmicas
  const renderCelulasEspecificas = (produto) => {
    if (!categoriaAtiva) return null;

    switch (categoriaAtiva) {
      case "FLORES":
        return (
          <>
            <td className="p-5">{produto.validade || "-"}</td>
            <td className="p-5">{produto.unidadeMedida || "-"}</td>
          </>
        );
      case "FLORES_SECAS":
        return (
          <>
            <td className="p-5">{produto.validade || "-"}</td>
            <td className="p-5">{produto.unidadeMedida || "-"}</td>
            <td className="p-5">{produto.processoSecagem || "-"}</td>
          </>
        );
      case "ARRANJOS":
        return (
          <>
            <td className="p-5">{produto.validade || "-"}</td>
            <td className="p-5">{produto.vaso || "-"}</td>
          </>
        );
      case "BUQUES":
        return (
          <>
            <td className="p-5">{produto.validade || "-"}</td>
            <td className="p-5">{produto.tamanho || "-"}</td>
          </>
        );
      case "CARTOES":
        return (
          <>
            <td className="p-5">{produto.tema || "-"}</td>
            <td className="p-5">{produto.dimensoes || "-"}</td>
          </>
        );
      case "KITS":
        return <td className="p-5">{produto.tema || "-"}</td>;
      default:
        return null;
    }
  };

  return (
    <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rosa-pastel mt-6">
      <div className="p-6 border-b border-rosa-pastel bg-rosa-pastel/20">
        <h2 className="text-2xl font-bold tracking-tight text-rosa-text">Estoque Atual</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse whitespace-nowrap">
          <thead>
            <tr className="bg-rosa-claro/50 text-rosa-choque uppercase text-xs font-black tracking-widest border-b border-rosa-pastel">
              <th className="p-5">Produto</th>
              <th className="p-5">Preço</th>
              <th className="p-5">Qtd</th>
              
              {/* Só mostra a coluna genérica de Categoria se estiver na aba "Todos" */}
              {!categoriaAtiva && <th className="p-5">Categoria</th>}
              
              {/* Colunas dinâmicas injetadas aqui */}
              {renderCabecalhosEspecificos()}
              
              <th className="p-5 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-rosa-pastel/30">
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="100%" className="p-10 text-center text-rosa-text/60 italic">
                  Nenhum produto encontrado.
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr
                  key={produto.codigo}
                  className="hover:bg-rosa-claro/30 transition-colors group"
                >
                  {/* COLUNA PRODUTO: Imagem e Nome agrupados */}
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
                          <div className="w-full h-full flex items-center justify-center text-[10px] text-rosa-choque/50 font-bold">
                            N/A
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-rosa-text">
                        {produto.nome}
                      </span>
                    </div>
                  </td>

                  {/* PREÇO E QUANTIDADE */}
                  <td className="p-5 font-bold text-rosa-choque">
                    R$ {Number(produto.preco).toFixed(2)}
                  </td>
                  <td className="p-5 font-medium text-gray-700">
                    {produto.quantidade}
                  </td>

                  {/* CATEGORIA GENÉRICA (quando não tem filtro ativo) */}
                  {!categoriaAtiva && (
                    <td className="p-5">
                      <span className="px-3 py-1 bg-rosa-pastel text-rosa-choque text-xs font-bold rounded-full">
                        {produto.categoria}
                      </span>
                    </td>
                  )}

                  {/* CÉLULAS DINÂMICAS INJETADAS AQUI */}
                  {renderCelulasEspecificas(produto)}

                  {/* AÇÕES: Botões com os SVGs originais */}
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

export default TabelaEstoque;