import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

// MODIFICAÇÃO: Nova tipagem baseada puramente no seu ItemCarrinhoDto do Java
interface ItemCarrinho {
  id: number;
  produtoCodigo: number;
  precoUnitario: number;
  produtoNome: string;
  descricao: string;
  quantidadePedida: number;
  produtoImagem: string;
  subtotal: number;
}

interface CarrinhoData {
  id: number;
  clienteId: number;
  clienteNome: string;
  valorTotal: number; 
  tipoPlanoAssinatura?: string;
  valorAssinatura?: number;
  estiloArranjoAssinatura?: string;
  coresPreferidasAssinatura?: string;
  observacaoAssinatura?: string;
  itens: ItemCarrinho[];
}

export default function CarrinhoPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [carrinho, setCarrinho] = useState<CarrinhoData | null>(null);
  const [loading, setLoading] = useState(true);

  const possuiItens = !!carrinho?.itens?.length;
  const possuiAssinatura = !!carrinho?.tipoPlanoAssinatura && !!carrinho?.valorAssinatura;

  const handleFinalizarCompra = async () => {
    const tokenAtual = token || localStorage.getItem("token");

    if (!tokenAtual) {
      console.error("BLOQUEADO: Nenhum token encontrado para finalizar compra.");
      navigate("/cliente-login");
      return;
    }

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/carrinho/finalizar", {}, {
        headers: {
          Authorization:  `Bearer ${tokenAtual}`
        }
      });

      alert("Pedido realizado com sucesso!");
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Houve um erro técnico ao processar seu pedido. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const carregarCarrinho = async () => {
    const tokenAtual = token || localStorage.getItem("token");

    if (!tokenAtual) {
      console.error("BLOQUEADO: Nenhum token encontrado para carregar o carrinho.");
      navigate("/cliente-login");
      return;
    }

    try {
      const response = await axios.get<CarrinhoData>("http://localhost:8080/carrinho", {
        headers: {
          Authorization: `Bearer ${tokenAtual}`,
        },
      });
      setCarrinho(response.data);
    } catch (error) {
      console.error("ERRO DO BACKEND AO BUSCAR CARRINHO:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/cliente-login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarCarrinho();
  }, [token]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-5xl bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        
        {/* Cabeçalho da Página */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-semibold">Seu Carrinho</h2>
            {carrinho?.clienteNome && (
              <p className="text-sm text-muted-foreground">Olá, {carrinho.clienteNome}! Gerencie suas flores selecionadas</p>
            )}
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium transition hover:bg-slate-200"
            onClick={() => navigate("/")}
          >
            Continuar Comprando
          </button>
        </div>

        {/* Verificação de Carrinho Vazio */}
        {!carrinho || (!possuiItens && !possuiAssinatura) ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-sm text-muted-foreground">Não há nenhum produto no seu carrinho no momento.</p>
            <button
              onClick={() => navigate("/")}
              className="rounded-full bg-rosa-choque text-white px-6 py-2 text-sm font-medium transition hover:bg-rosa-text"
            >
              Voltar à Vitrine
            </button>
          </div>
        ) : (
          /* Grid Principal */
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            
            {/* Seção dos Itens Cadastrados */}
            <div className="space-y-4">
              {possuiAssinatura && (
                <div className="rounded-2xl bg-[#fff7f8] p-4 border border-[#f3d7df] flex flex-col sm:flex-row items-center gap-4 justify-between">
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <div className="h-20 w-20 rounded-xl bg-white shadow-sm border border-[#f3d7df] flex items-center justify-center text-3xl">
                      🌸
                    </div>
                    <div>
                      <h3 className="text-md font-semibold text-slate-900">
                        Assinatura {carrinho.tipoPlanoAssinatura}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                        {carrinho.estiloArranjoAssinatura || "Flores selecionadas"} · {carrinho.coresPreferidasAssinatura || "sem preferência de cor"}
                      </p>
                      {carrinho.observacaoAssinatura && (
                        <p className="mb-1 text-xs text-slate-500">
                          Observação: {carrinho.observacaoAssinatura}
                        </p>
                      )}
                      <span className="text-sm font-bold text-slate-700">
                        R$ {(carrinho.valorAssinatura || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                    <div className="text-sm text-slate-600">
                      Plano: <span className="font-semibold text-slate-900 bg-white px-2 py-1 rounded-md border border-[#f3d7df] ml-1">{carrinho.tipoPlanoAssinatura}</span>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <span className="text-sm font-bold text-rosa-text">
                        R$ {(carrinho.valorAssinatura || 0).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {carrinho.itens.map((item) => (
                <div 
                  key={item.id} 
                  className="rounded-2xl bg-slate-50 p-4 border border-slate-100 flex flex-col sm:flex-row items-center gap-4 justify-between"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* MODIFICAÇÃO: Lendo diretamente do item.produtoImagem */}
                    <img
                      src={item.produtoImagem || "/assets/flor-padrao.jpg"}
                      alt={item.produtoNome || "Produto"}
                      className="h-20 w-20 rounded-xl object-cover shadow-sm bg-white"
                    />
                    <div>
                      {/* MODIFICAÇÃO: Lendo diretamente de item.produtoNome e item.descricao */}
                      <h3 className="text-md font-semibold text-slate-900">
                        {item.produtoNome || "Produto Indisponível"}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-1 mb-1">
                        {item.descricao || "Sem descrição disponível"}
                      </p>
                      <span className="text-sm font-bold text-slate-700">
                        R$ {item.precoUnitario ? item.precoUnitario.toFixed(2) : "0.00"}
                      </span>
                    </div>
                  </div>

                  {/* Controle de Exibição de Quantidades */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                    <div className="text-sm text-slate-600">
                      {/* MODIFICAÇÃO: Mudado para quantidadePedida */}
                      Qtd: <span className="font-semibold text-slate-900 bg-white px-2 py-1 rounded-md border border-slate-200 ml-1">{item.quantidadePedida}</span>
                    </div>
                    <div className="text-right min-w-[80px]">
                      <span className="text-sm font-bold text-rosa-text">
                        {/* MODIFICAÇÃO: Usando o subtotal calculado que veio direto do Java record */}
                        R$ {item.subtotal ? item.subtotal.toFixed(2) : "0.00"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Seção Lateral de Fechamento do Pedido */}
            <aside className="space-y-4">
              <section className="bg-white rounded-3xl p-6 border border-rosa-pastel shadow-sm bg-slate-50/50">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-6 bg-rosa-choque rounded-full"></span>
                  Resumo do Pedido
                </h3>
                
                <div className="space-y-2 border-b border-slate-200/60 pb-4 text-sm">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal:</span>
                    <span>R$ {(carrinho.valorTotal || 0).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Entrega:</span>
                    <span className="text-emerald-600 font-medium">Grátis</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between mb-6">
                  <span className="text-md font-semibold text-slate-900">Valor Total:</span>
                  <span className="text-xl font-bold text-rosa-text">
                    R$ {(carrinho.valorTotal || 0).toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-full rounded-full bg-rosa-choque text-white py-2.5 text-sm font-medium transition hover:bg-rosa-text text-center shadow-sm"
                    onClick={handleFinalizarCompra}
                  >
                    Finalizar Compra
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-full border border-slate-200 bg-white text-slate-600 py-2 text-sm font-medium transition hover:bg-slate-100 text-center"
                    onClick={() => navigate("/")}
                  >
                    Adicionar Mais Flores
                  </button>
                </div>
              </section>
            </aside>

          </div>
        )}
      </div>
    </div>
  );
}
