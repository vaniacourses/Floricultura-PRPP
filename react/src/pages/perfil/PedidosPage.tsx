import React, { useEffect, useState } from "react";
import { api } from "../../services/api";

interface PedidoItem {
  id?: string;
  nome?: string;
  quantidade?: number;
  preco?: number;
  valor?: number;
  descricao?: string;
}

interface Pedido {
  id?: string;
  numero?: string;
  status?: string;
  data?: string;
  total?: number;
  valorTotal?: number;
  itens?: PedidoItem[];
  items?: PedidoItem[];
  produtos?: PedidoItem[];
  endereco?: string;
  [key: string]: any;
}

const PedidosPage: React.FC = () => {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPedidos = async () => {
      setLoading(true);
      setError(null);

      try {
        const resposta = await api.get<Pedido[]>("/clientes/me/pedidos");
        if (Array.isArray(resposta)) {
          setPedidos(resposta);
          return;
        }
      } catch (err) {
        console.log("Erro ao buscar pedidos por /clientes/me/pedidos", err);
      }

      try {
        const resposta = await api.get<Pedido[]>("/pedidos");
        if (Array.isArray(resposta)) {
          setPedidos(resposta);
          return;
        }
      } catch (err) {
        console.log("Erro ao buscar pedidos por /pedidos", err);
      }

      const saved = localStorage.getItem("pedidos");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            setPedidos(parsed);
            return;
          }
        } catch {
          console.log("Não foi possível ler pedidos do localStorage");
        }
      }

      setPedidos([]);
      setError("Nenhum pedido encontrado para este cliente.");
    };

    loadPedidos().finally(() => setLoading(false));
  }, []);

  const formatDate = (value?: string) => {
    if (!value) return "-";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }).format(date);
  };

  const formatCurrency = (value?: number) => {
    if (typeof value !== "number") return "-";
    return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  };

  const getPedidoItems = (pedido: Pedido): PedidoItem[] => {
    return pedido.itens || pedido.items || pedido.produtos || [];
  };

  const renderOrderCard = (pedido: Pedido, index: number) => {
    const orderNumber = pedido.numero || pedido.id || `#${index + 1}`;
    const orderDate = formatDate(pedido.data || pedido.createdAt || pedido.dataPedido);
    const orderTotal = formatCurrency(pedido.total ?? pedido.valorTotal ?? pedido.totalPedido);
    const orderStatus = pedido.status || "Pendente";
    const itens = getPedidoItems(pedido);

    return (
      <article key={orderNumber + index} className="bg-white rounded-[32px] border border-rosa-pastel shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-rosa-choque font-black mb-2">Pedido {orderNumber}</p>
            <h2 className="text-2xl font-bold text-rosa-text">{orderDate}</h2>
          </div>
          <div className="text-right space-y-2">
            <p className="text-sm text-rosa-text/80">Status: <span className="font-bold text-rosa-text">{orderStatus}</span></p>
            <p className="text-sm text-rosa-text/80">Total: <span className="font-bold text-rosa-text">{orderTotal}</span></p>
          </div>
        </div>

        {pedido.endereco && (
          <div className="mb-6 p-4 rounded-3xl bg-rosa-claro/30 border border-rosa-pastel">
            <p className="text-sm text-rosa-text font-bold mb-1">Endereço de entrega</p>
            <p className="text-sm text-rosa-text/80">{pedido.endereco}</p>
          </div>
        )}

        <div className="space-y-4">
          {itens.length > 0 ? (
            itens.map((item, itemIndex) => (
              <div key={`${orderNumber}-${itemIndex}`} className="grid grid-cols-4 gap-4 items-center p-4 rounded-3xl bg-rosa-claro/20 border border-rosa-pastel">
                <div className="col-span-2">
                  <p className="font-bold text-rosa-text">{item.nome || item.descricao || "Produto"}</p>
                  <p className="text-sm text-rosa-text/70">Quantidade: {item.quantidade ?? 1}</p>
                </div>
                <p className="text-right font-black text-rosa-text col-span-2">{formatCurrency(item.preco ?? item.valor)}</p>
              </div>
            ))
          ) : (
            <div className="p-4 rounded-3xl bg-rosa-claro/20 border border-rosa-pastel text-rosa-text">
              Nenhum item listado para este pedido.
            </div>
          )}
        </div>
      </article>
    );
  };

  return (
    <section className="min-h-screen bg-rosa-claro p-8 font-menu text-rosa-text">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.35em] text-rosa-choque font-black mb-2">Área do Cliente</p>
          <h1 className="text-4xl md:text-5xl font-bold text-rosa-text">Meus Pedidos</h1>
          <p className="mt-3 text-sm text-rosa-text/80 max-w-2xl">
            Confira aqui todos os pedidos já realizados com a sua conta.
          </p>
        </header>

        {loading && (
          <div className="rounded-[32px] border border-rosa-pastel bg-white p-12 text-center text-rosa-text shadow-sm">
            Carregando pedidos...
          </div>
        )}

        {!loading && error && pedidos.length === 0 && (
          <div className="rounded-[32px] border border-rosa-pastel bg-white p-12 text-center text-rosa-text shadow-sm">
            <p className="font-bold text-rosa-text">Nenhum pedido encontrado.</p>
            <p className="mt-2 text-sm text-rosa-text/80">Verifique se você está logado ou se há pedidos salvos para essa conta.</p>
          </div>
        )}

        {!loading && pedidos.length > 0 && (
          <div className="grid gap-6">
            {pedidos.map(renderOrderCard)}
          </div>
        )}
      </div>
    </section>
  );
};

export default PedidosPage;
