/*import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { api } from "../../services/api";

interface ItemPedido {
  idProduto: number;
  nomeProduto: string;
  quantidade: number;
  precoUnitario: number;
}

interface Pedido {
  idPedido: number;
  data: string;
  valorTotal: number;
  status: string;
  origem: string;
  descricao: string;
  itens: ItemPedido[];
}

export default function PedidoDetalhesPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    carregarPedido();
  }, []);

  const carregarPedido = async () => {
    try {
      const response = await api.get<Pedido>(
        `/pedidos/admin/pedidos-detalhes/${id}`

      );

      setPedido(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (value: number) =>
    value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rosa-claro">
        <Loader2 className="animate-spin text-rosa-choque" />
      </div>
    );
  }

  if (!pedido) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Pedido não encontrado.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rosa-claro p-6">
      <div className="max-w-5xl mx-auto space-y-6">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-rosa-choque font-medium"
        >
          <ArrowLeft size={18} />
          Voltar
        </button>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-rosa-pastel/50">
          <h1 className="text-2xl font-bold text-rosa-text">
            Pedido #{pedido.idPedido}
          </h1>

          <div className="grid md:grid-cols-2 gap-4 mt-6">
            <div>
              <p className="text-sm text-rosa-text/60">Status</p>
              <p className="font-medium">{pedido.status}</p>
            </div>

            <div>
              <p className="text-sm text-rosa-text/60">Origem</p>
              <p className="font-medium">{pedido.origem}</p>
            </div>

            <div>
              <p className="text-sm text-rosa-text/60">Valor Total</p>
              <p className="font-medium">
                {formatCurrency(pedido.valorTotal)}
              </p>
            </div>

            <div>
              <p className="text-sm text-rosa-text/60">Descrição</p>
              <p className="font-medium">
                {pedido.descricao || "-"}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-rosa-pastel/50 overflow-hidden">
          <div className="p-6 border-b border-rosa-claro">
            <h2 className="font-bold text-lg">
              Itens do Pedido
            </h2>
          </div>

          <table className="w-full">
            <thead className="bg-rosa-claro/20">
              <tr>
                <th className="px-6 py-4 text-left">
                  Produto
                </th>
                <th className="px-6 py-4 text-center">
                  Quantidade
                </th>
                <th className="px-6 py-4 text-right">
                  Preço Unitário
                </th>
              </tr>
            </thead>

            <tbody>
              {pedido.itens?.map((item, index) => (
                <tr
                  key={index}
                  className="border-t border-rosa-claro/30"
                >
                  <td className="px-6 py-4">
                    {item.nomeProduto}
                  </td>

                  <td className="px-6 py-4 text-center">
                    {item.quantidade}
                  </td>

                  <td className="px-6 py-4 text-right">
                    {formatCurrency(item.precoUnitario)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}*/