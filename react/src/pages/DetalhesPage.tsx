import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import type { Produto, Avaliacao } from "../data/types";
import axios from "axios";

export default function DetalhesPage() {
  const { codigo } = useParams<{ codigo: string }>(); 
  const navigate = useNavigate(); 

  const [Produto, setProduto] = useState<Produto | null>(null);
  const [loading, setLoading] = useState(true);
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]); 
  
  const [formData, setFormData] = useState({
    texto: "",
    data: new Date().toISOString().split("T")[0],
    imagem: "/assets/comentario.jpg",
    nota: "",
    produtoId: Number(codigo),
    usuarioId: null,
  });

  const [editandoCodigo, setEditandoCodigo] = useState<number | null>(null);

  const carregarProduto = async () => {
    try {
      const response = await axios.get<Produto>(`http://localhost:8080/produtos/${codigo}`);
      setProduto(response.data);
    } catch (error) {
      console.error("Erro ao buscar produto:", error);
      navigate("/"); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (codigo) {
      carregarProduto();
      carregarAvaliacoes();
    }
  }, [codigo]);

  const carregarAvaliacoes = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/avaliacoes/produto?codigo=${codigo}`);
      setAvaliacoes(response.data);
    } catch (error) {
      console.error("Erro ao buscar avaliações do produto:", error instanceof Error ? error.message : error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.texto.trim() || !formData.nota.trim()) {
      alert("Preencha todos os campos!");
      return;
    }

    const token = localStorage.getItem("token");
    let idDoUsuarioLogado: number | null = null;

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        const dadosDoToken = JSON.parse(jsonPayload);
        idDoUsuarioLogado = dadosDoToken.clienteId;
      } catch (err) {
        console.error("Erro ao ler o ID de dentro do token:", err);
      }
    }

    const payload = {
      texto: formData.texto,
      nota: parseFloat(formData.nota),
      produtoId: Number(codigo),
      usuarioId: idDoUsuarioLogado ? Number(idDoUsuarioLogado) : null
    };

    const config = {
      headers: {
        Authorization: token ? `Bearer ${token}` : ""
      }
    };

    try {
      if (editandoCodigo) {
        await axios.put(
          `http://localhost:8080/avaliacoes/${editandoCodigo}`,
          payload,
          config
        );
      } else {
        await axios.post("http://localhost:8080/avaliacoes", payload, config);
      }

      setFormData({
        texto: "",
        data: new Date().toISOString().split("T")[0],
        imagem: "/assets/comentario.jpg",
        nota: "",
        produtoId: Number(codigo),
        usuarioId: null,
      });
      setEditandoCodigo(null);
      carregarAvaliacoes();
      alert("Avaliação enviada com sucesso!");
    } catch (error) {
      console.error("ERRO DO BACKEND:", error);
      if (axios.isAxiosError(error)) {
        console.error("Detalhes do erro:", error.response?.data);
        alert(`Erro ao salvar avaliação: ${error.response?.data?.message || error.message}`);
      } else {
        alert("Erro desconhecido ao salvar avaliação.");
      }
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  if (!Produto) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-5xl bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">{Produto.nome}</h2>
            <p className="text-sm text-muted-foreground">R$ {Produto.preco.toFixed(2)}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="border border-slate-200 rounded-full bg-white p-2 text-slate-400 hover:text-red-500 hover:border-red-200 transition flex items-center justify-center h-10 w-10 shadow-sm"
              onClick={() => alert("Favoritado! (Lógica ainda não implementada)")}
            >
              <span className="text-3xl leading-none select-none">♥</span>
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-slate-100 px-3 py-3 text-xs font-medium leading-none transition hover:bg-slate-200"
              onClick={() => navigate(-1)}
            >
              Fechar
            </button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr] mb-8">
          <img
            src={Produto.imagem}
            alt={Produto.nome}
            className="h-64 w-full rounded-2xl object-cover"
          />

          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-1">Descrição</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{Produto.descricao}</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-1">Disponibilidade</h3>
              {Produto.quantidade > 0 ? (
                <p className="text-sm text-emerald-600 font-medium">{Produto.quantidade} unidades em estoque</p>
              ) : (
                <span className="inline-block rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700">
                  Indisponível
                </span>
              )}
            </div>
          </div>
        </div>

        <section className="bg-white rounded-3xl shadow-xl p-4 md:p-6 border border-slate-100 mb-8">
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-slate-400 rounded-full"></span>
              Avaliações dos Clientes
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {avaliacoes.length === 0 ? (
              <p className="text-sm text-muted-foreground col-span-2">Nenhum comentário ainda para este produto.</p>
            ) : (
              avaliacoes.map((avaliacao) => (
                <div key={avaliacao.idAvaliacao} className="space-y-2 rounded-2xl bg-slate-50 p-4 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-sm font-semibold text-slate-900 mb-1">
                      <span>{avaliacao.usuarioNome}</span>
                      <span className="text-xs font-normal text-muted-foreground">{avaliacao.data}</span>
                    </div>
                    <p className="text-sm text-slate-700 font-normal leading-relaxed">{avaliacao.texto}</p>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-medium">Nota:</span>
                    <span className="text-sm font-bold text-amber-500">★ {avaliacao.nota}/5</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        <section className="bg-white rounded-3xl shadow-xl p-4 md:p-6 border border-rosa-pastel">
          <div>
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-6 bg-rosa-choque rounded-full"></span>
              Deixe seu comentário 
            </h2>
          </div>

          <form className="grid grid-cols-2 md:grid-cols-5 gap-6" onSubmit={handleSubmit}>
            <div className="grid gap-4 ls:grid-cols-1 col-span-4">
              <label className="text-sm font-medium">Texto</label>
              <textarea
                name="texto"
                value={formData.texto}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-2 py-1 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-1 col-span-1">
              <label className="text-sm font-medium">Nota</label>
              <select
                name="nota"
                value={formData.nota}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>

            <div className="md:col-span-5 flex justify-center gap-4 mt-2">
              <button
                type="submit"
                className="rounded-full border border-slate-200 bg-rosa-choque px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
              >
                Enviar comentário
              </button>
              <button
                type="button"
                className="rounded-full border border-slate-200 bg-rosa-choque px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
                onClick={() => navigate("/")}
              >
                Cancelar
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}