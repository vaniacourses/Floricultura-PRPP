import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  ShoppingCart,
  Users,
  DollarSign,
  Search,
  RotateCcw,
} from "lucide-react";
import { api } from "../../services/api";

interface PedidoHistorico {
  id: number;
  clienteNome: string;
  data: string;
  valorTotal: number;
  status: string;
}

export default function HistoricoPedidosPage() {
  const [loading, setLoading] = useState(false);

  const [filtroCliente, setFiltroCliente] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [pedidos, setPedidos] = useState<PedidoHistorico[]>([]);
  const navigate = useNavigate();
  
  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  const carregarPedidos = async () => {
    try {
      setLoading(true);

      const query = [
        filtroCliente &&
          `cliente=${encodeURIComponent(filtroCliente)}`,
        dataInicio && `dataInicio=${dataInicio}`,
        dataFim && `dataFim=${dataFim}`,
      ]
        .filter(Boolean)
        .join("&");

      const response = await api.get<PedidoHistorico[]>(
        `/pedidos/admin/historico${query ? `?${query}` : ""}`
      );
      console.log(response[0]);

      setPedidos(response);
    } catch (error) {
      console.error("Erro ao carregar pedidos:", error);
    } finally {
      setLoading(false);
    }
  };

  const limparFiltros = async () => {
    setFiltroCliente("");
    setDataInicio("");
    setDataFim("");

    try {
      setLoading(true);

      const response = await api.get<PedidoHistorico[]>(
        "/pedidos/admin/historico"
      );

      setPedidos(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarPedidos();
  }, []);

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();

    if (s.includes("entregue") || s.includes("pago")) {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          ● {status}
        </span>
      );
    }

    if (s.includes("pendente")) {
      return (
        <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">
          ● {status}
        </span>
      );
    }

    return (
      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rosa-claro text-rosa-text/70">
        ● {status}
      </span>
    );
  };

  const totalPedidos = pedidos.length;

  const clientesUnicos = new Set(
    pedidos.map((p) => p.clienteNome)
  ).size;

  const faturamento = pedidos.reduce(
    (acc, pedido) => acc + pedido.valorTotal,
    0
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-rosa-claro">
        <Loader2
          className="animate-spin text-rosa-choque"
          size={42}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* HEADER */}
        <div className="text-center space-y-2">
          <h1 className="font-logo text-5xl md:text-7xl text-rosa-choque">
            tudo são flores
          </h1>

          <p className="uppercase tracking-widest text-sm text-rosa-text/70">
            Histórico Geral de Pedidos
          </p>
        </div>

        {/* MÉTRICAS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-rosa-pastel/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rosa-text/60">
                  Total de Pedidos
                </p>

                <h3 className="text-3xl font-bold text-rosa-text mt-1">
                  {totalPedidos}
                </h3>
              </div>

              <ShoppingCart
                className="text-rosa-choque"
                size={24}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-rosa-pastel/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rosa-text/60">
                  Clientes Atendidos
                </p>

                <h3 className="text-3xl font-bold text-rosa-text mt-1">
                  {clientesUnicos}
                </h3>
              </div>

              <Users
                className="text-rosa-choque"
                size={24}
              />
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-rosa-pastel/50 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-rosa-text/60">
                  Faturamento
                </p>

                <h3 className="text-3xl font-bold text-rosa-text mt-1">
                  {formatCurrency(faturamento)}
                </h3>
              </div>

              <DollarSign
                className="text-rosa-choque"
                size={24}
              />
            </div>
          </div>
        </div>

         <div className="bg-white rounded-2xl border border-rosa-pastel/50 shadow-sm p-6">
          <h2 className="font-bold text-lg text-rosa-text mb-5">
            Filtros
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

            <div>
              <label className="text-sm text-rosa-text/70 block mb-2">
                Data Inicial
              </label>

              <input
                type="date"
                value={dataInicio}
                onChange={(e) =>
                  setDataInicio(e.target.value)
                }
                className="w-full border border-rosa-pastel rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rosa-choque/30"
              />
            </div>

            <div>
              <label className="text-sm text-rosa-text/70 block mb-2">
                Data Final
              </label>

              <input
                type="date"
                value={dataFim}
                onChange={(e) =>
                  setDataFim(e.target.value)
                }
                className="w-full border border-rosa-pastel rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rosa-choque/30"
              />
            </div>

            <div>
              <label className="text-sm text-rosa-text/70 block mb-2">
                Cliente
              </label>

              <input
                type="text"
                placeholder="Nome do cliente"
                value={filtroCliente}
                onChange={(e) =>
                  setFiltroCliente(e.target.value)
                }
                className="w-full border border-rosa-pastel rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rosa-choque/30"
              />
            </div>

            <div className="flex gap-3 items-end">
              <button
                onClick={carregarPedidos}
                className="flex-1 bg-rosa-choque text-white rounded-xl px-4 py-2.5 font-medium flex justify-center items-center gap-2 hover:opacity-90"
              >
                <Search size={18} />
                Filtrar
              </button>

              <button
                onClick={limparFiltros}
                className="px-4 py-2.5 rounded-xl border border-rosa-pastel text-rosa-text hover:bg-rosa-claro"
              >
                <RotateCcw size={18} />
              </button>
            </div>
          </div>
        </div>

         <div className="bg-white rounded-2xl border border-rosa-pastel/50 shadow-sm overflow-hidden">

          <div className="p-6 border-b border-rosa-claro flex items-center justify-between">
            <h2 className="text-lg font-bold text-rosa-text">
              Histórico de Pedidos
            </h2>

            <span className="text-xs bg-rosa-claro text-rosa-choque font-bold px-3 py-1 rounded-md">
              {pedidos.length} registros
            </span>
          </div>

          {pedidos.length === 0 ? (
            <div className="p-12 text-center text-rosa-text/60">
              Nenhum pedido encontrado.
            </div>
          ) : (
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead className="bg-rosa-claro/20 text-rosa-text uppercase text-[11px] tracking-wider">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      Pedido
                    </th>

                    <th className="px-6 py-4 text-left">
                      Cliente
                    </th>

                    <th className="px-6 py-4 text-left">
                      Data
                    </th>

                    <th className="px-6 py-4 text-left">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right">
                      Valor
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-rosa-claro/30">
                  {pedidos.map((pedido) => (
                    <tr
                      key={pedido.id}
                      className="hover:bg-rosa-claro/10 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono">
                        #{pedido.id}
                      </td>

                      <td className="px-6 py-4">
                      {/* TABELA <button
                        onClick={() => navigate(`/admin/pedidos-detalhes/${pedido.id}`)}
                        className="font-medium text-rosa-choque hover:underline"
                      >
                        
                      </button>*/}
                      {pedido.clienteNome}
                    </td>

                      <td className="px-6 py-4">
                        {new Date(
                          pedido.data
                        ).toLocaleDateString("pt-BR")}
                      </td>

                      <td className="px-6 py-4">
                        {getStatusBadge(pedido.status)}
                      </td>

                      <td className="px-6 py-4 text-right font-semibold">
                        {formatCurrency(
                          pedido.valorTotal
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}