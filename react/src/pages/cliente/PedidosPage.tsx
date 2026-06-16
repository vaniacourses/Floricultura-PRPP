import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

interface PedidoItem {
  id: number;
  idUsuario: number;
  codigo: number;
  nomeProduto?: string;
  produtoNome: string;
  quantidade: number;
  valorUnitario: number;
  subtotal: number;
}

interface PedidoData {
  idPedido: number;
  data: string;
  idUsuario: number;
  status: string;
  valorTotal: number;
  origem?: string;
  descricao?: string;
  idAssinatura?: string;
  estiloAssinatura?: string;
  coresAssinatura?: string;
  observacaoAssinatura?: string;
  observacaoReserva?: string;
  tipoEvento?: string;
  localEvento?: string;
  dataEvento?: string;
  finalidadeReserva?: string;
  itens: PedidoItem[];
}

export default function PedidosPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [pedidos, setPedidos] = useState<PedidoData[]>([]);
  const [loading, setLoading] = useState(true);

  const carregarPedidos = async () => {
    const tokenAtual = token || localStorage.getItem("token");

    if (!tokenAtual) {
      console.error("BLOQUEADO: Nenhum token encontrado para carregar pedidos.");
      navigate("/cliente-login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get<PedidoData[]>("http://localhost:8080/pedidos", {
        headers: {
          Authorization: `Bearer ${tokenAtual}`,
        },
      });
      setPedidos(response.data);
    } catch (error) {
      console.error("ERRO DO BACKEND AO BUSCAR HISTÓRICO DE PEDIDOS:", error);
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        navigate("/cliente-login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, [token]);

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    }).format(date);
  };

  const formatStatusPedido = (pedido: PedidoData) => {
    if (pedido.origem === "RESERVA") {
      if (pedido.status === "RESERVA_SOLICITADA") return "Aguardando confirmação";
      if (pedido.status === "RESERVA_CONFIRMADA") return "Reserva confirmada";
      if (pedido.status === "RESERVA_RECUSADA") return "Reserva recusada";
      return pedido.status || "Aguardando confirmação";
    }

    if (pedido.idAssinatura) return "ASSINATURA";
    return pedido.status || "PROCESSANDO";
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Carregando seus pedidos...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto max-w-5xl bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-slate-100">
        
        <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Meus Pedidos</h2>
            <p className="text-sm text-muted-foreground">Acompanhe o histórico de todas as suas compras de flores</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-xs font-medium transition hover:bg-slate-200"
            onClick={() => navigate("/")}
          >
            Voltar para a Vitrine
          </button>
        </div>

        {!pedidos || pedidos.length === 0 ? (
          <div className="text-center py-12 space-y-4">
            <p className="text-sm text-muted-foreground">Você ainda não realizou nenhum pedido no nosso sistema.</p>
            <button
              onClick={() => navigate("/")}
              className="rounded-full bg-rosa-choque text-white px-6 py-2 text-sm font-medium transition hover:bg-rosa-text"
            >
              Escolher minhas primeiras flores
            </button>
          </div>
        ) : (

          <div className="space-y-6">
            {pedidos.map((pedido) => (
              <div 
                key={pedido.idPedido} 
                className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden"
              >

              <div className="bg-slate-50 p-4 border-b border-slate-200 flex flex-wrap justify-between items-center gap-4">
                <div className="flex gap-6 text-xs text-slate-600">
                  <div>
                    <p className="uppercase font-semibold tracking-wider text-slate-400">Pedido realizado</p>
                    <p className="font-medium text-slate-800">{formatDate(pedido.data)}</p>
                  </div>
                  <div>
                    <p className="uppercase font-semibold tracking-wider text-slate-400">Total</p>
                    <p className="font-bold text-rosa-text">R$ {(pedido.valorTotal || 0).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="uppercase font-semibold tracking-wider text-slate-400">Nº do Pedido</p>
                    <p className="font-medium text-slate-800">#{pedido.idPedido}</p>
                  </div>
                </div>
                <div>
                  <span className="inline-flex items-center rounded-full bg-pink-50 px-3 py-1 text-xs font-semibold text-rosa-choque ring-1 ring-inset ring-pink-700/10">
                    {formatStatusPedido(pedido)}
                  </span>
                </div>
              </div>

                <div className="p-4 divide-y divide-slate-100">
                  {pedido.origem === "RESERVA" && (
                    <div className="pb-4 text-sm text-slate-600">
                      <p>
                        <span className="font-bold text-slate-800">Evento:</span>{" "}
                        {pedido.tipoEvento || "-"} {pedido.finalidadeReserva ? `· ${pedido.finalidadeReserva}` : ""}
                      </p>
                      <p className="mt-1">
                        <span className="font-bold text-slate-800">Local:</span>{" "}
                        {pedido.localEvento || "-"}
                      </p>
                      <p className="mt-1">
                        <span className="font-bold text-slate-800">Data da entrega:</span>{" "}
                        {formatDate(pedido.dataEvento)}
                      </p>
                      {pedido.observacaoReserva && (
                        <p className="mt-1">
                          <span className="font-bold text-slate-800">Observação:</span>{" "}
                          {pedido.observacaoReserva}
                        </p>
                      )}
                    </div>
                  )}

                  {pedido.idAssinatura && (
                    <div className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-rosa-claro/20 border border-rosa-pastel flex items-center justify-center text-xl">
                          🌸
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">
                            {pedido.descricao || "Assinatura de flores"}
                          </h4>
                          <p className="text-xs text-slate-500">
                            Código da assinatura: {pedido.idAssinatura || "-"}
                          </p>
                          {(pedido.estiloAssinatura || pedido.coresAssinatura) && (
                            <p className="text-xs text-slate-500">
                              {pedido.estiloAssinatura || "Estilo livre"} · {pedido.coresAssinatura || "sem preferência de cor"}
                            </p>
                          )}
                          {pedido.observacaoAssinatura && (
                            <p className="text-xs text-slate-500">
                              Observação: {pedido.observacaoAssinatura}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700">R$ {(pedido.valorTotal || 0).toFixed(2)}</p>
                        <p className="text-xs text-slate-400">{pedido.status || "PROCESSANDO"}</p>
                      </div>
                    </div>
                  )}

                  {pedido.itens && pedido.itens.length > 0 ? pedido.itens.map((item) => (
                    <div key={item.id} className="py-4 flex items-center justify-between gap-4 first:pt-0 last:pb-0">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-rosa-claro/20 border border-rosa-pastel flex items-center justify-center text-xl">
                          🌸
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-slate-900">{item.nomeProduto || item.produtoNome || "Produto"}</h4>
                          <p className="text-xs text-slate-500">Quantidade: {item.quantidade}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-700">R$ {(item.subtotal || 0).toFixed(2)}</p>
                        <p className="text-xs text-slate-400">un: R$ {(item.valorUnitario || 0).toFixed(2)}</p>
                      </div>
                    </div>
                  )) : !pedido.idAssinatura && (
                    <div className="py-4 text-sm text-slate-500">Nenhum item detalhado para este pedido.</div>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
