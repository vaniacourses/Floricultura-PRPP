import { type ChangeEvent, type FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
// ADIÇÃO: Importação de ícones simples para a lixeira e botões (opcional, ou use texto/SVG se preferir)
// Se não usar lucide-react, os SVGs nativos já foram incluídos no código abaixo.

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

interface Cupom {
  idCupom: number;
  nomeCupom: string;
  desconto: number;
  limiteDeUso: number;
  dataInicio: string;
  dataFim: string;
}

interface Endereco {
  id: number;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento?: string;
}

type EnderecoForm = Omit<Endereco, "id">;

const CUPOM_DISPONIVEL = "PRIMEIRACOMPRA10";
const enderecoInicial: EnderecoForm = {
  cep: "",
  rua: "",
  numero: "",
  bairro: "",
  cidade: "",
  uf: "",
  complemento: "",
};

export default function CarrinhoPage() {
  const navigate = useNavigate();
  const { token } = useAuth();

  const [carrinho, setCarrinho] = useState<CarrinhoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [processandoPagamento, setProcessandoPagamento] = useState(false);
  const [nomeCupom, setNomeCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState<Cupom | null>(null);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [idEnderecoSelecionado, setIdEnderecoSelecionado] = useState<number | null>(null);
  const [mostrarNovoEndereco, setMostrarNovoEndereco] = useState(false);
  const [salvandoEndereco, setSalvandoEndereco] = useState(false);
  const [novoEndereco, setNovoEndereco] = useState<EnderecoForm>(enderecoInicial);

  const possuiItens = !!carrinho?.itens?.length;
  const possuiAssinatura = !!carrinho?.tipoPlanoAssinatura && !!carrinho?.valorAssinatura;
  const subtotal = carrinho?.valorTotal || 0;
  const valorDesconto = cupomAplicado ? Number((subtotal * Number(cupomAplicado.desconto)).toFixed(2)) : 0;
  const valorTotalComDesconto = Math.max(subtotal - valorDesconto, 0);
  const formatarEndereco = (endereco: Endereco) => {
    const complemento = endereco.complemento ? `, ${endereco.complemento}` : "";
    return `${endereco.rua}, ${endereco.numero}${complemento} - ${endereco.bairro}, ${endereco.cidade}/${endereco.uf} - CEP ${endereco.cep}`;
  };

  // Procure estas três funções na sua CarrinhoPage.tsx e aplique a MODIFICAÇÃO:

  const handleAlterarQuantidade = async (itemId: number, quantidadeAtual: number, mudanca: number) => {
    const tokenAtual = token || localStorage.getItem("token");
    if (!tokenAtual) return;

    const novaQuantidade = quantidadeAtual + mudanca;

    // Se a quantidade nova for zero ou menos, deletamos o item
    if (novaQuantidade <= 0) {
      handleRemoverItem(itemId);
      return;
    }

    try {
      // MODIFICAÇÃO: Batendo em /item/ e enviando os params que o @RequestParam do Java espera
      await axios.put(`http://localhost:8080/carrinho/item/${itemId}`, null, {
        params: { 
          novaQuantidade: novaQuantidade 
        },
        headers: { 
          Authorization: `Bearer ${tokenAtual}` 
        }
      });
      
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao atualizar quantidade do item:", error);
    }
  };

  const handleRemoverItem = async (itemId: number) => {
    const tokenAtual = token || localStorage.getItem("token");
    if (!tokenAtual) return;

    try {
      // MODIFICAÇÃO: Rota ajustada para /carrinho/item/{id}
      await axios.delete(`http://localhost:8080/carrinho/item/${itemId}`, {
        headers: { 
          Authorization: `Bearer ${tokenAtual}` 
        }
      });
      
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao remover item do carrinho:", error);
    }
  };

  const handleEsvaziarCarrinho = async () => {
    const tokenAtual = token || localStorage.getItem("token");
    if (!tokenAtual) return;

    if (!window.confirm("Tem certeza que deseja limpar todo o seu carrinho?")) return;

    try {
      setLoading(true);
      // MODIFICAÇÃO: DELETE cru na raiz do /carrinho para esvaziar a lista
      await axios.delete("http://localhost:8080/carrinho", {
        headers: { 
          Authorization: `Bearer ${tokenAtual}` 
        }
      });
      
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao esvaziar carrinho:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAplicarCupom = async () => {
    const codigo = nomeCupom.trim();
    if (!codigo) {
      setCupomAplicado(null);
      alert("Informe o nome do cupom.");
      return;
    }

    if (codigo.toUpperCase() !== CUPOM_DISPONIVEL) {
      setCupomAplicado(null);
      alert("Cupom não encontrado.");
      return;
    }

    try {
      const response = await axios.get<Cupom[]>("http://localhost:8080/cupons");
      const cupom = response.data.find((item) => item.nomeCupom?.toLowerCase() === codigo.toLowerCase());
      const hoje = new Date().toISOString().split("T")[0];

      if (!cupom) {
        setCupomAplicado(null);
        alert("Cupom não encontrado.");
        return;
      }

      if (cupom.dataInicio && cupom.dataInicio > hoje) {
        setCupomAplicado(null);
        alert("Este cupom ainda não está vigente.");
        return;
      }

      if (cupom.dataFim && cupom.dataFim < hoje) {
        setCupomAplicado(null);
        alert("Este cupom está expirado.");
        return;
      }

      if (!cupom.limiteDeUso || cupom.limiteDeUso <= 0) {
        setCupomAplicado(null);
        alert("Este cupom não possui usos disponíveis.");
        return;
      }

      setCupomAplicado(cupom);
    } catch (error) {
      console.error("Erro ao validar cupom:", error);
      alert("Não foi possível validar o cupom. Tente novamente.");
    }
  };

  const handleFinalizarCompra = async () => {
    const tokenAtual = token || localStorage.getItem("token");
    if (!tokenAtual) {
      console.error("BLOQUEADO: Nenhum token encontrado para finalizar compra.");
      navigate("/cliente-login");
      return;
    }

    if (!idEnderecoSelecionado) {
      alert("Informe um endereço de entrega para finalizar a compra.");
      return;
    }

    try {
      setLoading(true);
      setProcessandoPagamento(true);
      await axios.post("http://localhost:8080/carrinho/finalizar", {
        nomeCupom: nomeCupom.trim() || null,
        idEndereco: idEnderecoSelecionado,
      }, {
        headers: { Authorization: `Bearer ${tokenAtual}` }
      });

      alert("Pedido realizado com sucesso!");
      carregarCarrinho();
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      if (axios.isAxiosError(error) && error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Houve um erro técnico ao processar seu pedido. Tente novamente.");
      }
    } finally {
      setProcessandoPagamento(false);
      setLoading(false);
    }
  };

  const carregarEnderecos = async () => {
    const tokenAtual = token || localStorage.getItem("token");
    if (!tokenAtual) return;

    try {
      const response = await axios.get<Endereco[]>("http://localhost:8080/clientes/me/enderecos", {
        headers: { Authorization: `Bearer ${tokenAtual}` },
      });
      setEnderecos(response.data);
      setIdEnderecoSelecionado((atual) => atual || response.data[0]?.id || null);
    } catch (error) {
      console.error("Erro ao carregar endereços:", error);
    }
  };

  const handleNovoEnderecoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNovoEndereco((atual) => ({ ...atual, [name]: value }));
  };

  const handleSalvarNovoEndereco = async (event: FormEvent) => {
    event.preventDefault();
    const tokenAtual = token || localStorage.getItem("token");
    if (!tokenAtual) return;

    if (novoEndereco.cep.trim().length !== 8) {
      alert("CEP deve ter 8 dígitos.");
      return;
    }

    if (novoEndereco.uf.trim().length !== 2) {
      alert("UF deve ter 2 caracteres.");
      return;
    }

    try {
      setSalvandoEndereco(true);
      const response = await axios.post<Endereco>("http://localhost:8080/clientes/me/enderecos", {
        ...novoEndereco,
        cep: novoEndereco.cep.trim(),
        uf: novoEndereco.uf.trim().toUpperCase(),
      }, {
        headers: { Authorization: `Bearer ${tokenAtual}` },
      });

      setEnderecos((atuais) => [...atuais, response.data]);
      setIdEnderecoSelecionado(response.data.id);
      setNovoEndereco(enderecoInicial);
      setMostrarNovoEndereco(false);
    } catch (error) {
      console.error("Erro ao salvar endereço:", error);
      alert("Não foi possível salvar o endereço. Tente novamente.");
    } finally {
      setSalvandoEndereco(false);
    }
  };

  const carregarCarrinho = async () => {
    const tokenAtual = token || localStorage.getItem("token");
    if (!tokenAtual) {
      console.error("BLOQUEADO: Nenhum token encontrado para carregar o carrinho.");
      navigate("/cliente-login");
      return;
    }

    try {
      const response = await axios.get<CarrinhoData>("http://localhost:8080/carrinho", {
        headers: { Authorization: `Bearer ${tokenAtual}` },
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
    carregarEnderecos();
  }, [token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {processandoPagamento ? "Aguardando confirmação do pagamento..." : "Carregando..."}
      </div>
    );
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
          <div className="flex gap-2">
            {/* ADIÇÃO: Botão Limpar Carrinho no cabeçalho se houver itens */}
            {carrinho && carrinho.itens && carrinho.itens.length > 0 && (
              <button
                type="button"
                className="rounded-full border border-red-200 bg-red-50 text-red-600 px-4 py-2 text-xs font-medium transition hover:bg-red-100 flex items-center gap-1"
                onClick={handleEsvaziarCarrinho}
              >
                Limpar Carrinho
              </button>
            )}
          </div>
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
                    <img
                      src={item.produtoImagem || "/assets/flor-padrao.jpg"}
                      alt={item.produtoNome || "Produto"}
                      className="h-20 w-20 rounded-xl object-cover shadow-sm bg-white"
                    />
                    <div>
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

                  {/* MODIFICAÇÃO: Seção de controles de quantidade e exclusão individual */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200/60">
                    
                    {/* Botões de - / Qtd / + */}
                    <div className="flex items-center border border-slate-200 bg-white rounded-lg p-1 shadow-sm">
                      <button
                        type="button"
                        onClick={() => handleAlterarQuantidade(item.id, item.quantidadePedida, -1)}
                        className="px-2 py-1 text-slate-500 hover:text-rosa-choque text-sm font-bold transition"
                      >
                        –
                      </button>
                      <span className="px-3 text-sm font-semibold text-slate-900 min-w-[24px] text-center">
                        {item.quantidadePedida}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleAlterarQuantidade(item.id, item.quantidadePedida, 1)}
                        className="px-2 py-1 text-slate-500 hover:text-rosa-choque text-sm font-bold transition"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right min-w-[80px]">
                      <span className="text-sm font-bold text-rosa-text">
                        R$ {item.subtotal ? item.subtotal.toFixed(2) : "0.00"}
                      </span>
                    </div>

                    {/* ADIÇÃO: Ícone de lixeira individual */}
                    <button
                      type="button"
                      onClick={() => handleRemoverItem(item.id)}
                      className="text-slate-400 hover:text-red-500 transition p-1"
                      title="Remover produto do carrinho"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                      </svg>
                    </button>
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
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  {cupomAplicado && (
                    <div className="flex justify-between text-emerald-700">
                      <span>Cupom {cupomAplicado.nomeCupom}:</span>
                      <span>- R$ {valorDesconto.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-600">
                    <span>Entrega:</span>
                    <span className="text-emerald-600 font-medium">Grátis</span>
                  </div>
                </div>

                <div className="py-4 border-b border-slate-200/60">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h4 className="text-sm font-semibold text-slate-700">Endereço de entrega</h4>
                    <button
                      type="button"
                      className="text-xs font-medium text-rosa-choque hover:text-rosa-text"
                      onClick={() => setMostrarNovoEndereco((atual) => !atual)}
                    >
                      {mostrarNovoEndereco ? "Escolher cadastrado" : "Novo endereço"}
                    </button>
                  </div>

                  {!mostrarNovoEndereco && (
                    <div className="space-y-2">
                      {enderecos.length === 0 ? (
                        <p className="text-sm text-slate-500">Nenhum endereço cadastrado.</p>
                      ) : (
                        enderecos.map((endereco) => (
                          <label
                            key={endereco.id}
                            className={`block cursor-pointer rounded-xl border p-3 text-sm transition ${
                              idEnderecoSelecionado === endereco.id
                                ? "border-rosa-choque bg-rosa-claro/40"
                                : "border-slate-200 bg-white hover:border-rosa-pastel"
                            }`}
                          >
                            <input
                              type="radio"
                              name="enderecoEntrega"
                              className="mr-2 accent-rosa-choque"
                              checked={idEnderecoSelecionado === endereco.id}
                              onChange={() => setIdEnderecoSelecionado(endereco.id)}
                            />
                            <span className="font-medium text-slate-800">
                              {endereco.rua}, {endereco.numero}
                            </span>
                            <span className="mt-1 block text-xs text-slate-500">
                              {formatarEndereco(endereco)}
                            </span>
                          </label>
                        ))
                      )}
                    </div>
                  )}

                  {mostrarNovoEndereco && (
                    <form onSubmit={handleSalvarNovoEndereco} className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <input name="cep" value={novoEndereco.cep} onChange={handleNovoEnderecoChange} maxLength={8} required className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rosa-choque" placeholder="CEP" />
                        <input name="uf" value={novoEndereco.uf} onChange={handleNovoEnderecoChange} maxLength={2} required className="rounded-xl border border-slate-200 px-3 py-2 text-sm uppercase outline-none focus:border-rosa-choque" placeholder="UF" />
                      </div>
                      <input name="rua" value={novoEndereco.rua} onChange={handleNovoEnderecoChange} required className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rosa-choque" placeholder="Rua" />
                      <div className="grid grid-cols-2 gap-2">
                        <input name="numero" value={novoEndereco.numero} onChange={handleNovoEnderecoChange} required className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rosa-choque" placeholder="Número" />
                        <input name="bairro" value={novoEndereco.bairro} onChange={handleNovoEnderecoChange} required className="rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rosa-choque" placeholder="Bairro" />
                      </div>
                      <input name="cidade" value={novoEndereco.cidade} onChange={handleNovoEnderecoChange} required className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rosa-choque" placeholder="Cidade" />
                      <input name="complemento" value={novoEndereco.complemento} onChange={handleNovoEnderecoChange} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-rosa-choque" placeholder="Complemento (opcional)" />
                      <button
                        type="submit"
                        className="w-full rounded-full border border-rosa-pastel bg-white py-2 text-sm font-medium text-rosa-text transition hover:bg-rosa-claro disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={salvandoEndereco}
                      >
                        {salvandoEndereco ? "Salvando..." : "Salvar e usar endereço"}
                      </button>
                    </form>
                  )}
                </div>

                <div className="py-4 border-b border-slate-200/60">
                  <label className="text-sm font-semibold text-slate-700" htmlFor="cupom">
                    Cupom de desconto
                  </label>
                  <div className="mt-2 flex gap-2">
                    <input
                      id="cupom"
                      value={nomeCupom}
                      onChange={(event) => {
                        setNomeCupom(event.target.value);
                        setCupomAplicado(null);
                      }}
                      className="min-w-0 flex-1 rounded-full border border-slate-200 px-3 py-2 text-sm outline-none transition focus:border-rosa-choque"
                      placeholder="Digite o cupom"
                    />
                    <button
                      type="button"
                      className="rounded-full border border-rosa-pastel bg-white px-4 py-2 text-sm font-medium text-rosa-text transition hover:bg-rosa-claro"
                      onClick={handleAplicarCupom}
                    >
                      Aplicar
                    </button>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between mb-6">
                  <span className="text-md font-semibold text-slate-900">Valor Total:</span>
                  <span className="text-xl font-bold text-rosa-text">
                    R$ {valorTotalComDesconto.toFixed(2)}
                  </span>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="w-full rounded-full bg-rosa-choque text-white py-2.5 text-sm font-medium transition hover:bg-rosa-text text-center shadow-sm disabled:cursor-not-allowed disabled:opacity-60"
                    onClick={handleFinalizarCompra}
                    disabled={processandoPagamento}
                  >
                    {processandoPagamento ? "Aguardando pagamento..." : "Finalizar Compra"}
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-full border border-slate-200 bg-white text-slate-600 py-2 text-sm font-medium transition hover:bg-slate-100 text-center"
                    onClick={() => navigate("/")}
                  >
                    Adicionar Mais Produtos
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
