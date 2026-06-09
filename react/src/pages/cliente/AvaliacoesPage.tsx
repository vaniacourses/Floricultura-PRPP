import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { api } from "../../services/api";

type Avaliacao = {
  idAvaliacao: number;
  texto: string;
  data: string;
  imagem?: string;
  nota: number;
  produtoId: number;
  usuarioId: number;
  usuarioNome?: string;
};

const AvaliacoesPage = () => {
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setErro("Faça login para ver suas avaliações.");
      setLoading(false);
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      const usuarioId = payload.usuarioId;
      // guarda usuário logado para permitir ações (ex: excluir)
      // (aqui não sobrescrevemos o nome da variável)
      
      if (!usuarioId || isNaN(usuarioId)) {
        setErro("Não foi possível identificar seu usuário. Faça login novamente.");
        setLoading(false);
        return;
      }

      api
        .get<Avaliacao[]>(`/avaliacoes/usuario?usuarioId=${usuarioId}`)
        .then((response) => setAvaliacoes(response))
        .catch((error) => {
          console.error("Erro ao carregar avaliações:", error);
          setErro("Não foi possível carregar suas avaliações. Tente novamente.");
        })
        .finally(() => setLoading(false));
    } catch (error) {
      console.error("Erro ao decodificar token:", error);
      setErro("Erro de autenticação. Faça login novamente.");
      setLoading(false);
    }
  }, []);

  const openProduto = (produtoId: number) => {
    navigate(`/detalhesPage/${produtoId}`);
  };

  if (loading) return (
    <div className="min-h-screen bg-rosa-claro font-menu p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-rosa-choque" size={48} />
      </div>
    </div>
  );

  if (erro) return (
    <div className="min-h-screen bg-rosa-claro font-menu p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-rosa-pastel bg-white p-8 text-center text-rosa-text shadow-sm">
          <p>{erro}</p>
        </div>
      </div>
    </div>
  );

  if (avaliacoes.length === 0) return (
    <div className="min-h-screen bg-rosa-claro font-menu p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-3xl border border-rosa-pastel bg-white p-8 text-center text-rosa-text shadow-sm">
          <p className="text-lg font-medium text-rosa-text">Você ainda não fez nenhuma avaliação.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-rosa-claro font-menu p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="font-logo text-4xl text-rosa-choque mb-6">Minhas Avaliações</h1>
        <div className="space-y-6">
          {avaliacoes.map((a) => (
            <div key={a.idAvaliacao} className="rounded-2xl bg-white p-6 shadow-sm border border-rosa-pastel">
              <div className="flex items-start gap-4">
                {a.imagem && (
                  <img src={a.imagem} alt="imagem avaliacao" className="w-28 h-28 object-cover rounded-md" />
                )}
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="font-semibold text-lg">{a.usuarioNome || 'Você'}</h3>
                    <div className="text-rosa-choque font-black">{a.nota.toFixed(1)}</div>
                  </div>
                  <p className="mt-2 text-rosa-text opacity-80">{a.texto}</p>
                  <div className="mt-4 flex gap-3">
                      <button className="rounded-full border px-4 py-2 text-sm" onClick={() => openProduto(a.produtoId)}>
                        Ver produto
                      </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvaliacoesPage;