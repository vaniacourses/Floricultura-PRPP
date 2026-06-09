import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api } from "../../services/api";
import type { Produto } from "../../data/types";

const FavoritosPage = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Faça login para ver seus favoritos.");
      setLoading(false);
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      const usuarioId = payload.usuarioId;

      if (!usuarioId || isNaN(usuarioId)) {
        setErro("Nao foi possivel identificar seu usuario. Faça login novamente.");
        setLoading(false);
        return;
      }

      api
        .get<Produto[]>(`/api/favoritos/usuario/${usuarioId}`)
        .then((response) => setProdutos(response))
        .catch((error) => {
          console.error("Erro ao carregar favoritos:", error);
          setErro("Nao foi possivel carregar seus favoritos. Tente novamente.");
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      setErro("Erro de autenticacao. Faça login novamente.");
      setLoading(false);
    }
  }, []);

  const handleProdutoClick = (produto: Produto) => {
    navigate(`/detalhesPage/${produto.codigo}`);
  };

  return (
    <div className="min-h-screen bg-rosa-claro font-menu p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="font-logo text-4xl md:text-5xl text-rosa-choque mb-3">
            Meus Favoritos
          </h1>
          <p className="text-rosa-text opacity-80 max-w-2xl">
            Aqui estão os produtos que voce marcou como favoritos. Clique em qualquer produto para ver mais detalhes.
          </p>
        </header>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="animate-spin text-rosa-choque" size={48} />
          </div>
        ) : erro ? (
          <div className="rounded-3xl border border-rosa-pastel bg-white p-8 text-center text-rosa-text shadow-sm">
            <p>{erro}</p>
          </div>
        ) : produtos.length === 0 ? (
          <div className="rounded-3xl border border-rosa-pastel bg-white p-8 text-center text-rosa-text shadow-sm">
            <p className="text-lg font-medium text-rosa-text">Voce ainda nao favoritou nenhum produto.</p>
            <p className="mt-2 opacity-80">Navegue pela loja e adicione produtos aos seus favoritos.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {produtos.map((produto) => (
              <button
                key={produto.codigo}
                onClick={() => handleProdutoClick(produto)}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-rosa-pastel transition-all duration-300 hover:-translate-y-1 text-left w-full cursor-pointer"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-rosa-text text-lg truncate group-hover:text-rosa-choque transition-colors">
                    {produto.nome}
                  </h3>
                  <p className="text-rosa-choque font-black text-xl mt-3">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritosPage;
