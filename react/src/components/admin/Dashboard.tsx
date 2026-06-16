import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { Loader2, Package, TrendingUp, AlertTriangle, Truck, RefreshCw, User } from "lucide-react";
import type { DashboardDto, Produto } from "../../data/types";
import CardMetrica from "./MetricaCard";

export default function DashboardPage() {
  const [data, setData] = useState<DashboardDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const carregarDashboard = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await api.get<DashboardDto>("/dashboard/hoje");
      setData(response);
    } catch (e: any) {
      setError(e.response?.data?.message || "Não foi possível carregar as informações.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarDashboard();
  }, []);

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });


  const getStatusBadge = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes("pago") || statusLower.includes("entregue")) {
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">● {status}</span>;
    }
    if (statusLower.includes("pendente") || statusLower.includes("processando")) {
      return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-50 text-amber-700 border border-amber-200">● {status}</span>;
    }
    return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-rosa-claro text-rosa-text/70">● {status}</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col gap-4 justify-center items-center bg-rosa-claro/40 backdrop-blur-sm">
        <div className="relative flex items-center justify-center">
          <Loader2 className="animate-spin text-rosa-choque" size={48} />
          <span className="absolute text-[10px] font-bold text-rosa-choque/70 uppercase tracking-widest scale-75">Flor</span>
        </div>
        <p className="text-sm font-medium text-rosa-text/60 animate-pulse">Colhendo dados do dia...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rosa-claro/40 p-4">
        <h3 className="text-lg font-bold text-rosa-text">Ops! Algo deu errado</h3>
      </div>
    );
  }


  const estoqueOrdenado = data.estoqueCritico 
    ? [...data.estoqueCritico].sort((a, b) => a.quantidade - b.quantidade)
    : [];

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu text-rosa-tex">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2 py-4">
          <h1 className="font-logo text-5xl md:text-7xl text-rosa-choque">tudo são flores</h1>
          <p className="uppercase tracking-widest text-sm opacity-80 mt-2">
           Dashboard do dia {new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardMetrica
            icon={<Package size={22} className="text-rosa-choque" />}
            titulo="Total de Pedidos"
            valor={data.totalPedidosHoje}
            detalhes="Registrados hoje"
          />
          <CardMetrica
            icon={<TrendingUp size={22} className="text-rosa-choque" />}
            titulo="Faturamento"
            valor={formatCurrency(data.faturamentoHoje)}
            detalhes="Valor bruto gerado"
          />
          <CardMetrica
            icon={<AlertTriangle size={22} className="text-rosa-choque" />}
            titulo="Estoque Crítico"
            valor={data.estoqueCritico.length}
            detalhes="Itens com menos de 10 un."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          <div className="lg:col-span-2 bg-white rounded-2xl border border-rosa-pastel/50 shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-rosa-claro flex items-center justify-between bg-white z-10">
              <h2 className="text-lg font-bold flex items-center gap-2 text-rosa-text">
                <Package size={20} className="text-rosa-choque" />
                Pedidos de Hoje
              </h2>
              <span className="text-xs bg-rosa-claro text-rosa-choque font-bold px-2.5 py-1 rounded-md">
                {data.pedidosHoje.length} total
              </span>
            </div>
            
            {data.pedidosHoje.length === 0 ? (
              <div className="p-12 text-center text-rosa-text/50 italic">
                Nenhum pedido efetuado até o momento.
              </div>
            ) : (
              <div className="overflow-auto max-h-[440px] custom-scrollbar">
                <table className="w-full table-auto text-sm text-left border-collapse">
                  <thead className="bg-rosa-claro/20 backdrop-blur-sm text-rosa-text/80 font-medium uppercase tracking-wider text-[11px] sticky top-0 shadow-[0_1px_0_0_rgba(251,207,232,0.3)] z-10">
                    <tr>
                      <th className="px-6 py-3 bg-rosa-claro/20">ID</th>
                      <th className="px-6 py-3 bg-rosa-claro/20">Cliente</th>
                      <th className="px-6 py-3 bg-rosa-claro/20">Status</th>
                      <th className="px-6 py-3 bg-rosa-claro/20 text-right">Valor</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-rosa-claro/30 text-rosa-text">
                    {data.pedidosHoje.map((p) => (
                      <tr key={p.id} className="hover:bg-rosa-claro/10 transition-colors">
                        <td className="px-6 py-4 font-mono text-xs text-rosa-text/50">#{p.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{p.clienteNome || "Cliente Balcão"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">{getStatusBadge(p.status)}</td>
                        <td className="px-6 py-4 text-right font-semibold">
                          {formatCurrency(p.valorTotal)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="space-y-6">
            
            <div className="bg-white rounded-2xl border border-rosa-pastel/50 shadow-sm overflow-hidden flex flex-col">
              <div className="p-5 border-b border-rosa-claro bg-white">
                <h2 className="text-md font-bold flex items-center gap-2 text-rosa-text">
                  <AlertTriangle size={18} className="text-rosa-choque" />
                  Atenção ao Estoque
                </h2>
              </div>
              
              {estoqueOrdenado.length === 0 ? (
                <div className="p-6 text-center text-sm text-rosa-text bg-rosa-claro/20 italic">
                  ✓ Tudo abastecido por aqui!
                </div>
              ) : (
                <div className="divide-y divide-rosa-claro/30 max-h-[225px] overflow-y-auto custom-scrollbar">
                  {estoqueOrdenado.map((p: Produto) => (
                    <div key={p.codigo} className="p-4 h-[75px] flex items-center justify-between hover:bg-rosa-claro/10 transition-colors">
                      <div className="space-y-0.5">
                        <p className="text-sm font-medium truncate max-w-[150px] md:max-w-[180px]">{p.nome}</p>
                        <p className="text-xs font-mono text-rosa-text/50">Cód: {p.codigo}</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-rosa-claro text-rosa-choque font-bold text-xs border border-rosa-pastel strict-block shrink-0">
                        {p.quantidade} un
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-rosa-pastel/50 shadow-sm p-5 relative overflow-hidden group">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rosa-claro flex items-center justify-center text-rosa-choque transition-transform group-hover:scale-110">
                  <Truck size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-rosa-text">Rotas de Entrega</h3>
                  <p className="text-xs text-rosa-text/60">Logística integrada em breve</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-rosa-claro flex items-center justify-between text-xs text-rosa-choque font-medium">
                <span>Ativar notificações</span>
                <span className="w-2 h-2 rounded-full bg-rosa-pastel" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}