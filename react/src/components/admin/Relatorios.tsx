import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  Loader2,
  Package,
  Users,
  CreditCard,
  Truck,
  ShoppingCart,
  TrendingUp,
  TicketPercent,
  Tag,
} from "lucide-react";

import type { RelatorioDTO } from "../../data/types";
import CardMetrica from "./MetricaCard";

type Periodo = "semana" | "mes" | "ano";

const Relatorio: React.FC = () => {
  const [periodo, setPeriodo] = useState<Periodo>("mes");
  const [dados, setDados] = useState<RelatorioDTO | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const carregarRelatorio = async (periodoSelecionado: Periodo) => {
    setLoading(true);
    setErro(null);
    try {
      const response = await api.get<RelatorioDTO>(
        `/relatorios?periodo=${periodoSelecionado}`
      );
      setDados(response);
    } catch (e: any) {
      setErro(e.response?.data?.message || "Erro ao carregar relatório");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarRelatorio(periodo);
  }, [periodo]);

  const handlePeriodo = (p: Periodo) => setPeriodo(p);

  const obterAssinaturaLider = () => {
    if (!dados || !dados.assinaturas || !dados.assinaturas.porTipo)
      return { nome: "Nenhuma", qtd: 0 };

    const entradas = Object.entries(dados.assinaturas.porTipo);
    if (entradas.length === 0) return { nome: "Nenhuma", qtd: 0 };

    let maiorNome = "";
    let maiorQtd = -1;

    entradas.forEach(([nome, qtd]) => {
      if ((qtd as number) > maiorQtd) {
        maiorQtd = qtd as number;
        maiorNome = nome;
      }
    });

    return { nome: maiorNome, qtd: maiorQtd };
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-rosa-claro">
        <Loader2 className="animate-spin text-rosa-choque" size={48} />
      </div>
    );
  }

  if (erro || !dados) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rosa-claro">
        <p className="text-red-600 font-bold">{erro || "Relatório indisponível"}</p>
      </div>
    );
  }

  const assinaturaLider = obterAssinaturaLider();

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu text-rosa-text">
      <div className="max-w-6xl mx-auto">
        {/* CABEÇALHO */}
        <div className="text-center mb-8">
          <h1 className="font-logo text-5xl md:text-7xl text-rosa-choque">tudo são flores</h1>
          <p className="uppercase tracking-widest text-sm opacity-80 mt-2">
            relatórios de análise de desempenho da floricultura · período:{" "}
            {new Date(dados.dataInicio).toLocaleDateString("pt-BR")} até{" "}
            {new Date(dados.dataFim).toLocaleDateString("pt-BR")}
          </p>
          <div className="flex justify-center gap-2 mt-6">
            {(["semana", "mes", "ano"] as Periodo[]).map((p) => (
              <button
                key={p}
                onClick={() => handlePeriodo(p)}
                className={`px-6 py-2 rounded-full font-bold transition-colors ${
                  periodo === p
                    ? "bg-rosa-choque text-white shadow-lg"
                    : "bg-white text-rosa-text hover:bg-rosa-pastel"
                }`}
              >
                {p === "semana"
                  ? "Última Semana"
                  : p === "mes"
                  ? "Último Mês"
                  : "Último Ano"}
              </button>
            ))}
          </div>
        </div>

        {/* MÉTRICAS PRINCIPAIS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <CardMetrica
            icon={<Users size={24} />}
            titulo="Clientes"
            valor={dados.clientes.totalClientes}
            detalhes={`+${dados.clientes.novosNoPeriodo} no período`}
          />
          <CardMetrica
            icon={<CreditCard size={24} />}
            titulo="Assinaturas Ativas"
            valor={dados.assinaturas.totalAtivas}
            detalhes={`${dados.assinaturas.novasNoPeriodo} novas`}
          />
          <CardMetrica
            icon={<TrendingUp size={24} />}
            titulo="Ticket Médio"
            valor={`R$ ${dados.ticketMedio.toFixed(2)}`}
            detalhes="valor médio por pedido"
          />
          <CardMetrica
            icon={<ShoppingCart size={24} />}
            titulo="Pedidos"
            valor={dados.pedidos.totalNoPeriodo}
            detalhes="no período"
          />
          <CardMetrica
            icon={<TrendingUp size={24} />}
            titulo="Faturamento"
            valor={`R$ ${dados.faturamentoTotal.toFixed(2)}`}
            detalhes="no período"
          />
          <CardMetrica
            icon={<TicketPercent size={24} />}
            titulo="Cupons"
            valor={dados.cupons.totalCupons}
            detalhes={`${dados.cupons.ativos} ativos, +${dados.cupons.novosNoPeriodo} no período`}
          />
        </div>

        {/* CARDS DE DESTAQUES */}
        <div className="mt-10 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp size={24} className="text-rosa-choque" />
              Destaques de Vendas no Período
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Produto mais vendido */}
              <div className="bg-rosa-claro/30 rounded-xl p-5 flex flex-col items-center text-center">
                <Package size={32} className="text-rosa-choque mb-2" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">Mais Vendido</h3>
                <p className="text-2xl font-bold mt-1 text-rosa-text">
                  {dados.vendas.produtoMaisVendido}
                </p>
                <p className="text-sm opacity-75">
                  {dados.vendas.quantidadeProdutoMaisVendido} unid.
                </p>
              </div>

              {/* Categoria mais vendida */}
              <div className="bg-rosa-claro/30 rounded-xl p-5 flex flex-col items-center text-center">
                <Tag size={32} className="text-rosa-choque mb-2" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">Categoria Líder</h3>
                <p className="text-2xl font-bold mt-1 text-rosa-text">
                  {dados.vendas.categoriaMaisVendida}
                </p>
                <p className="text-sm opacity-75">Maior volume do período</p>
              </div>

              {/* Assinatura líder */}
              <div className="bg-rosa-claro/30 rounded-xl p-5 flex flex-col items-center text-center">
                <CreditCard size={32} className="text-rosa-choque mb-2" />
                <h3 className="font-semibold text-sm uppercase tracking-wider">Assinatura Líder</h3>
                <p className="text-2xl font-bold mt-1 text-rosa-text capitalize">
                  {assinaturaLider.nome.toLowerCase()}
                </p>
                <p className="text-sm opacity-75">{assinaturaLider.qtd} planos ativos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Relatorio;