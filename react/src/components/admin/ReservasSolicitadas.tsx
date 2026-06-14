import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, Loader2, MapPin, XCircle } from "lucide-react";
import { api } from "../../services/api";

type PedidoItem = {
  id: number;
  nomeProduto?: string;
  produtoNome?: string;
  quantidade: number;
  estoqueAtual?: number;
  valorUnitario: number;
  subtotal: number;
};

type ReservaSolicitada = {
  idPedido: number;
  data: string;
  idUsuario: number;
  status: string;
  descricao?: string;
  valorTotal: number;
  observacaoReserva?: string;
  tipoEvento?: string;
  localEvento?: string;
  dataEvento?: string;
  finalidadeReserva?: string;
  itens: PedidoItem[];
};

const formatarData = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatarMoeda = (valor: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor || 0);

const ReservasSolicitadas = () => {
  const [reservas, setReservas] = useState<ReservaSolicitada[]>([]);
  const [loading, setLoading] = useState(true);
  const [processandoId, setProcessandoId] = useState<number | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const carregarReservas = async () => {
    try {
      setErro(null);
      const data = await api.get<ReservaSolicitada[]>("/pedidos/reservas/solicitadas");
      setReservas(data);
    } catch (e: any) {
      setErro(e.message || "Erro ao carregar reservas solicitadas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  const atualizarReserva = async (idPedido: number, acao: "confirmar" | "recusar") => {
    try {
      setProcessandoId(idPedido);
      setErro(null);
      await api.put(`/pedidos/reserva/${idPedido}/${acao}`, {});
      await carregarReservas();
    } catch (e: any) {
      setErro(e.message || "Não foi possível atualizar a reserva.");
    } finally {
      setProcessandoId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-52 items-center justify-center">
        <Loader2 className="animate-spin text-rosa-choque" size={34} />
      </div>
    );
  }

  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-rosa-text">Reservas solicitadas</h2>
          <p className="text-sm font-medium text-[#6f4b5a]">
            Avalie os pedidos de reserva enviados pelos clientes.
          </p>
        </div>
        <span className="rounded-full bg-rosa-claro px-4 py-2 text-sm font-bold text-rosa-choque">
          {reservas.length} pendente{reservas.length === 1 ? "" : "s"}
        </span>
      </div>

      {erro && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
          {erro}
        </div>
      )}

      {reservas.length === 0 ? (
        <div className="rounded-xl border border-rosa-pastel bg-white p-8 text-center text-sm font-semibold text-[#6f4b5a]">
          Nenhuma reserva solicitada no momento.
        </div>
      ) : (
        <div className="space-y-4">
          {reservas.map((reserva) => (
            <article key={reserva.idPedido} className="rounded-xl border border-rosa-pastel bg-white p-5 shadow-sm">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-rosa-pastel pb-4">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-rosa-text">Reserva #{reserva.idPedido}</h3>
                    <span className="rounded-full bg-pink-50 px-3 py-1 text-xs font-bold text-rosa-choque">
                      {reserva.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-[#6f4b5a]">
                    {reserva.descricao || "Solicitação de reserva para evento"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold uppercase tracking-wide text-[#6f4b5a]">Total estimado</p>
                  <p className="text-lg font-bold text-rosa-text">{formatarMoeda(reserva.valorTotal)}</p>
                </div>
              </div>

              <div className="grid gap-4 py-4 text-sm font-semibold text-[#6f4b5a] md:grid-cols-2">
                <div className="flex gap-3">
                  <CalendarDays className="mt-0.5 text-rosa-choque" size={18} />
                  <div>
                    <p><span className="font-bold text-rosa-text">Evento:</span> {reserva.tipoEvento || "-"}</p>
                    <p><span className="font-bold text-rosa-text">Finalidade:</span> {reserva.finalidadeReserva || "-"}</p>
                    <p><span className="font-bold text-rosa-text">Data da entrega:</span> {formatarData(reserva.dataEvento)}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <MapPin className="mt-0.5 text-rosa-choque" size={18} />
                  <div>
                    <p><span className="font-bold text-rosa-text">Local:</span> {reserva.localEvento || "-"}</p>
                    <p><span className="font-bold text-rosa-text">Solicitada em:</span> {formatarData(reserva.data)}</p>
                    <p><span className="font-bold text-rosa-text">Cliente:</span> #{reserva.idUsuario}</p>
                    {reserva.observacaoReserva && (
                      <p><span className="font-bold text-rosa-text">Observação:</span> {reserva.observacaoReserva}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-rosa-pastel bg-rosa-claro/20">
                {reserva.itens?.length ? (
                  reserva.itens.map((item) => (
                    <div key={item.id} className="flex flex-wrap items-center justify-between gap-3 border-b border-rosa-pastel px-4 py-3 last:border-b-0">
                      <div>
                        <p className="font-bold text-rosa-text">{item.nomeProduto || item.produtoNome || "Produto"}</p>
                        <p className="text-xs font-semibold text-[#6f4b5a]">Solicitado: {item.quantidade}</p>
                        <p className="text-xs font-semibold text-[#6f4b5a]">
                          Estoque atual: {item.estoqueAtual ?? "-"}
                        </p>
                      </div>
                      <div className="text-right text-sm font-semibold text-[#6f4b5a]">
                        <p>{formatarMoeda(item.subtotal)}</p>
                        <p className="text-xs">un. {formatarMoeda(item.valorUnitario)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm font-semibold text-[#6f4b5a]">
                    Nenhum produto detalhado nesta reserva.
                  </div>
                )}
              </div>

              <div className="mt-4 flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={() => atualizarReserva(reserva.idPedido, "recusar")}
                  disabled={processandoId === reserva.idPedido}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 text-sm font-bold text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processandoId === reserva.idPedido ? <Loader2 className="animate-spin" size={16} /> : <XCircle size={16} />}
                  Recusar
                </button>
                <button
                  type="button"
                  onClick={() => atualizarReserva(reserva.idPedido, "confirmar")}
                  disabled={processandoId === reserva.idPedido}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-rosa-choque px-5 text-sm font-bold text-white transition hover:bg-rosa-text disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {processandoId === reserva.idPedido ? <Loader2 className="animate-spin" size={16} /> : <CheckCircle2 size={16} />}
                  Confirmar
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default ReservasSolicitadas;
