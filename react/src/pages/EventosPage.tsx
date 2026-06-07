import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, Loader2, Minus, Plus, Trash2 } from "lucide-react";
import { api } from "../services/api";
import type { Produto } from "../data/types";

type ItemReserva = {
  produtoCodigo: number;
  quantidade: number;
};

const tiposEvento = ["Casamento", "Aniversário", "Formatura", "Corporativo", "Outro"];
const finalidades = ["Decoração de mesas", "Buquê", "Lembrancinhas", "Palco", "Entrada/recepção", "Outro"];

const EventosPage = () => {
  const navigate = useNavigate();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [tipoEvento, setTipoEvento] = useState(tiposEvento[0]);
  const [localEvento, setLocalEvento] = useState("");
  const [dataEvento, setDataEvento] = useState("");
  const [dataEntrega, setDataEntrega] = useState("");
  const [finalidade, setFinalidade] = useState(finalidades[0]);
  const [observacao, setObservacao] = useState("");
  const [itens, setItens] = useState<ItemReserva[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    api.get<Produto[]>("/produtos")
      .then((data) => setProdutos(data.filter((produto) => produto.quantidade > 0)))
      .catch((e: any) => setErro(e.message || "Não foi possível carregar os produtos."))
      .finally(() => setCarregando(false));
  }, []);

  const produtosPorCodigo = useMemo(() => {
    return new Map(produtos.map((produto) => [produto.codigo, produto]));
  }, [produtos]);

  const produtosDisponiveis = produtos.filter(
    (produto) => !itens.some((item) => item.produtoCodigo === produto.codigo)
  );

  const quantidadeTotal = itens.reduce((acc, item) => acc + item.quantidade, 0);

  const subtotal = itens.reduce((acc, item) => {
    const produto = produtosPorCodigo.get(item.produtoCodigo);
    return acc + (produto?.preco || 0) * item.quantidade;
  }, 0);

  const adicionarItem = () => {
    const produto = produtosDisponiveis[0];
    if (!produto) return;
    setItens((prev) => [...prev, { produtoCodigo: produto.codigo, quantidade: 1 }]);
  };

  const atualizarItem = (index: number, dados: Partial<ItemReserva>) => {
    setItens((prev) => prev.map((item, itemIndex) => {
      if (itemIndex !== index) return item;
      const produtoCodigo = dados.produtoCodigo ?? item.produtoCodigo;
      const produto = produtosPorCodigo.get(produtoCodigo);
      const limite = produto?.quantidade || 1;
      const quantidade = Math.max(1, Math.min(dados.quantidade ?? item.quantidade, limite));
      return { produtoCodigo, quantidade };
    }));
  };

  const removerItem = (index: number) => {
    setItens((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  const montarPayload = () => ({
    tipoEvento,
    localEvento,
    dataEvento,
    dataReserva: dataEntrega,
    finalidade,
    observacao,
    itens: itens.map((item) => ({
      idProduto: item.produtoCodigo,
      quantidade: item.quantidade,
    })),
  });

  const salvarReserva = async (compraDireta: boolean) => {
    if (!tipoEvento || !localEvento || !dataEvento || !dataEntrega || !finalidade || itens.length === 0) {
      setErro("Informe os dados do evento, a entrega e pelo menos um produto.");
      return;
    }

    setSalvando(true);
    setErro(null);

    try {
      await api.post(compraDireta ? "/pedidos/reserva/comprar" : "/pedidos/reserva", montarPayload());

      navigate("/cliente/pedidos");
    } catch (e: any) {
      setErro(e.message || "Não foi possível processar a reserva.");
    } finally {
      setSalvando(false);
    }
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  if (carregando) {
    return (
      <div className="min-h-screen bg-[#fff7f8] flex items-center justify-center">
        <Loader2 className="animate-spin text-rosa-choque" size={42} />
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#fff7f8] px-4 py-8 font-menu text-rosa-text md:px-8">
      <section className="ml-0 max-w-7xl lg:ml-6 xl:ml-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-black">Reservas para eventos</h1>
          <p className="mt-2 max-w-3xl text-sm font-medium text-[#6f4b5a]">
            Transforme datas especiais com a nossa seleção de flores. Personalize o seu pedido, solicite um orçamento sob medida ou garanta as flores do seu evento agora mesmo.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
          <section className="rounded-lg border border-rosa-pastel bg-white p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <CalendarDays size={18} className="text-rosa-choque" />
                  Data do evento
                </span>
                <input
                  type="datetime-local"
                  value={dataEvento}
                  onChange={(event) => setDataEvento(event.target.value)}
                  className="min-h-12 rounded-xl border-2 border-rosa-pastel px-4 font-semibold outline-none focus:border-rosa-choque"
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-2 flex items-center gap-2 text-sm font-bold">
                  <CalendarDays size={18} className="text-rosa-choque" />
                  Entrega desejada
                </span>
                <input
                  type="datetime-local"
                  value={dataEntrega}
                  onChange={(event) => setDataEntrega(event.target.value)}
                  className="min-h-12 rounded-xl border-2 border-rosa-pastel px-4 font-semibold outline-none focus:border-rosa-choque"
                />
              </label>

              <label className="flex flex-col">
                <span className="mb-2 text-sm font-bold">Tipo de evento</span>
                <select
                  value={tipoEvento}
                  onChange={(event) => setTipoEvento(event.target.value)}
                  className="min-h-12 rounded-xl border-2 border-rosa-pastel bg-white px-4 font-semibold outline-none focus:border-rosa-choque"
                >
                  {tiposEvento.map((tipo) => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col">
                <span className="mb-2 text-sm font-bold">Finalidade das flores</span>
                <select
                  value={finalidade}
                  onChange={(event) => setFinalidade(event.target.value)}
                  className="min-h-12 rounded-xl border-2 border-rosa-pastel bg-white px-4 font-semibold outline-none focus:border-rosa-choque"
                >
                  {finalidades.map((item) => (
                    <option key={item} value={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col md:col-span-2">
                <span className="mb-2 text-sm font-bold">Local do evento</span>
                <input
                  value={localEvento}
                  onChange={(event) => setLocalEvento(event.target.value)}
                  placeholder="Ex.: Salão Primavera, Rua das Flores, 123"
                  className="min-h-12 rounded-xl border-2 border-rosa-pastel px-4 font-semibold outline-none focus:border-rosa-choque"
                />
              </label>

              <label className="flex flex-col md:col-span-2">
                <span className="mb-2 text-sm font-bold">Observação</span>
                <input
                  value={observacao}
                  onChange={(event) => setObservacao(event.target.value)}
                  placeholder="Ex.: retirar pela manhã, decoração de casamento..."
                  className="min-h-12 rounded-xl border-2 border-rosa-pastel px-4 font-semibold outline-none focus:border-rosa-choque"
                />
              </label>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <h2 className="text-xl font-bold">Produtos da reserva</h2>
              <button
                type="button"
                onClick={adicionarItem}
                disabled={produtosDisponiveis.length === 0}
                className="inline-flex items-center gap-2 rounded-full bg-rosa-choque px-4 py-2 text-sm font-bold text-white transition hover:bg-rosa-text disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Plus size={16} />
                Adicionar produto
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {itens.length === 0 ? (
                <div className="rounded-lg border-2 border-dashed border-rosa-pastel bg-rosa-claro/20 p-6 text-center text-sm font-semibold text-[#6f4b5a]">
                  Adicione os produtos e quantidades para montar a reserva.
                </div>
              ) : (
                itens.map((item, index) => {
                  const produto = produtosPorCodigo.get(item.produtoCodigo);
                  return (
                    <div key={`${item.produtoCodigo}-${index}`} className="rounded-lg border border-rosa-pastel bg-[#fffafb] p-4">
                      <div className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-end">
                        <label className="flex flex-col">
                          <span className="mb-2 text-sm font-bold">Produto</span>
                          <select
                            value={item.produtoCodigo}
                            onChange={(event) => atualizarItem(index, { produtoCodigo: Number(event.target.value), quantidade: 1 })}
                            className="min-h-12 rounded-xl border-2 border-rosa-pastel bg-white px-4 font-semibold outline-none focus:border-rosa-choque"
                          >
                            {[produto, ...produtosDisponiveis].filter(Boolean).map((opcao) => (
                              <option key={opcao!.codigo} value={opcao!.codigo}>
                                {opcao!.nome} - {opcao!.quantidade} un.
                              </option>
                            ))}
                          </select>
                        </label>

                        <div>
                          <span className="mb-2 block text-sm font-bold">Quantidade</span>
                          <div className="flex min-h-12 items-center rounded-xl border-2 border-rosa-pastel bg-white">
                            <button
                              type="button"
                              onClick={() => atualizarItem(index, { quantidade: item.quantidade - 1 })}
                              className="px-3 text-rosa-text transition hover:text-rosa-choque"
                            >
                              <Minus size={16} />
                            </button>
                            <input
                              type="number"
                              min={1}
                              max={produto?.quantidade || 1}
                              value={item.quantidade}
                              onChange={(event) => atualizarItem(index, { quantidade: Number(event.target.value) })}
                              className="w-16 border-x border-rosa-pastel text-center font-bold outline-none"
                            />
                            <button
                              type="button"
                              onClick={() => atualizarItem(index, { quantidade: item.quantidade + 1 })}
                              className="px-3 text-rosa-text transition hover:text-rosa-choque"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => removerItem(index)}
                          className="inline-flex min-h-12 items-center justify-center rounded-xl border border-red-200 bg-red-50 px-4 text-red-600 transition hover:bg-red-100"
                          title="Remover produto"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-3 flex justify-between text-sm font-semibold text-[#6f4b5a]">
                        <span>Unitário: {formatarMoeda(produto?.preco || 0)}</span>
                        <span>Subtotal: {formatarMoeda((produto?.preco || 0) * item.quantidade)}</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <aside className="h-fit rounded-lg border border-rosa-pastel bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold">Resumo</h2>
            <div className="mt-4 space-y-3 text-sm font-semibold text-[#6f4b5a]">
              <div className="flex justify-between">
                <span>Itens</span>
                <span>{quantidadeTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Produtos diferentes</span>
                <span>{itens.length}</span>
              </div>
              <div className="border-t border-rosa-pastel pt-3">
                <div className="flex justify-between text-lg font-bold text-rosa-text">
                  <span>Total</span>
                  <span>{formatarMoeda(subtotal)}</span>
                </div>
              </div>
            </div>

            {erro && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm font-semibold text-red-600">
                {erro}
              </div>
            )}

            <button
              type="button"
              onClick={() => salvarReserva(false)}
              disabled={salvando || itens.length === 0}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-rosa-choque bg-white px-5 font-bold text-rosa-choque transition hover:bg-rosa-claro disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando && <Loader2 className="animate-spin" size={18} />}
              {salvando ? "Solicitando orçamento..." : "Solicitar orçamento"}
            </button>

            <button
              type="button"
              onClick={() => salvarReserva(true)}
              disabled={salvando || itens.length === 0}
              className="mt-3 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-rosa-choque px-5 font-bold text-white transition hover:bg-rosa-text disabled:cursor-not-allowed disabled:opacity-60"
            >
              {salvando && <Loader2 className="animate-spin" size={18} />}
              {salvando ? "Processando compra..." : "Comprar direto"}
            </button>
          </aside>
        </div>
      </section>
    </main>
  );
};

export default EventosPage;
