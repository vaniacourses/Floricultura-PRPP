import { useEffect, useState } from "react";
import {
  CheckCircle2,
  Loader2,
  PackageCheck,
  Flower2,
  Gift,
  Truck,
  UserPlus,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { adicionarAssinaturaAoCarrinho, consultarMinhaAssinatura, type Assinatura } from "../services/assinaturasApi";

const PLANOS = [
  {
    nome: "Mensal",
    subtitulo: "1 entrega por mês",
    descricao: "Receba uma seleção especial de flores por mês para renovar o ambiente com delicadeza.",
    valor: 89.9,
  },
  {
    nome: "Quinzenal",
    subtitulo: "2 entregas por mês",
    descricao: "Receba flores a cada quinze dias, em uma frequência equilibrada para sua rotina.",
    valor: 149.9,
  },
  {
    nome: "Semanal",
    subtitulo: "4 entregas por mês",
    descricao: "Receba flores selecionadas toda semana para manter o ambiente sempre renovado.",
    valor: 249.9,
  },
];

const ETAPAS_ASSINATURA = [
  {
    texto: "Escolha seu plano e cadastre-se",
    Icone: UserPlus,
  },
  {
    texto: "Aproveite os benefícios da assinatura",
    Icone: Gift,
  },
  {
    texto: "Receba seus novos buquês com frete grátis",
    Icone: Truck,
  },
  {
    texto: "Desfrute de uma experiência floral única",
    Icone: Flower2,
  },
];

const obterRoleToken = (token: string | null) => {
  if (!token) return null;

  try {
    const payloadBase64 = token.split(".")[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson);
    return payload.role || null;
  } catch {
    return null;
  }
};

const isRoleAdmin = (role: string | null) =>
  role === "GERENTE" || role === "ATENDENTE" || role === "SUPER_ADMIN";

const AssinaturasPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [planoSelecionado, setPlanoSelecionado] = useState("Mensal");
  const [carregandoPlano, setCarregandoPlano] = useState("");
  const [verificandoAssinatura, setVerificandoAssinatura] = useState(false);
  const [assinaturaAtiva, setAssinaturaAtiva] = useState<Assinatura | null>(null);
  const [erro, setErro] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [personalizacao, setPersonalizacao] = useState({
    estiloArranjo: "Delicado",
    coresPreferidas: "Tons suaves",
    observacao: "",
  });

  const planoAtual = PLANOS.find((plano) => plano.nome === planoSelecionado) || PLANOS[1];
  const isAdmin = isRoleAdmin(obterRoleToken(token || localStorage.getItem("token")));

  useEffect(() => {
    if (!isAuthenticated || isAdmin) {
      setAssinaturaAtiva(null);
      return;
    }

    const carregarAssinaturaAtiva = async () => {
      try {
        setVerificandoAssinatura(true);
        const assinatura = await consultarMinhaAssinatura();
        setAssinaturaAtiva(assinatura || null);
      } catch {
        setAssinaturaAtiva(null);
      } finally {
        setVerificandoAssinatura(false);
      }
    };

    carregarAssinaturaAtiva();
  }, [isAuthenticated, isAdmin]);

  const formatarMoeda = (valor: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);

  const selecionarPlano = (tipoPlano: string) => {
    setPlanoSelecionado(tipoPlano);
    setErro("");
  };

  const handleIniciarCompra = () => {
    if (!isAuthenticated) {
      navigate("/cliente-login");
      return;
    }

    if (isAdmin) {
      setErro("Assinaturas são exclusivas para contas de cliente.");
      return;
    }

    if (assinaturaAtiva) {
      setErro("Você já possui uma assinatura ativa.");
      return;
    }

    setErro("");
    setModalAberto(true);
  };

  const handleAdicionarAoCarrinho = async () => {
    if (isAdmin) {
      setErro("Assinaturas são exclusivas para contas de cliente.");
      setModalAberto(false);
      return;
    }

    try {
      setCarregandoPlano(planoSelecionado);
      await adicionarAssinaturaAoCarrinho(planoSelecionado, personalizacao);
      setModalAberto(false);
      navigate("/carrinho");
    } catch (e: any) {
      setErro(
        e.status === 409
          ? "Você já possui uma assinatura ativa."
          : e.message || "Não foi possível colocar a assinatura no carrinho. Verifique se o backend está rodando."
      );
    } finally {
      setCarregandoPlano("");
    }
  };

  return (
    <main className="min-h-screen bg-[#fff7f8] font-[Arial] text-rosa-text">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[1fr_340px] md:py-12">
        <div>
          <div className="mb-8">
            <h1 className="font-[Arial] text-2xl font-black leading-none text-black md:text-4xl">
              Assinaturas
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-[#6f4b5a] md:text-lg">
              Escolha um plano e receba flores selecionadas para deixar sua rotina mais bonita.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {ETAPAS_ASSINATURA.map(({ texto, Icone }, index) => (
                <div
                  key={texto}
                  className="group relative min-h-32 overflow-hidden rounded-[2rem] border border-[#f3d7df] bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:border-[#e4a5ba] hover:shadow-lg"
                >
                  <div className="absolute right-4 top-3 text-4xl font-black text-[#fff0f4]">
                    {index + 1}
                  </div>
                  <div className="relative flex h-full flex-col justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff0f4] text-[#b63b6d] transition group-hover:bg-[#b63b6d] group-hover:text-white">
                      <Icone size={20} />
                    </span>
                    <p className="max-w-[12rem] text-sm font-bold leading-snug text-[#4f3340]">
                      {texto}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PLANOS.map((plano) => {
              const selecionado = planoSelecionado === plano.nome;

              return (
                <button
                  key={plano.nome}
                  type="button"
                  onClick={() => selecionarPlano(plano.nome)}
                  disabled={!!carregandoPlano}
                  className={`flex min-h-[320px] flex-col rounded-2xl border bg-white/95 p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ${
                    selecionado
                      ? "border-[#d56a92] ring-2 ring-[#f2bfd0]"
                      : "border-[#f3d7df]"
                  } disabled:cursor-not-allowed disabled:opacity-70`}
                >
                  <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-[#fff0f4] px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#b63b6d]">
                      Plano
                    </span>
                    {selecionado && <CheckCircle2 className="text-[#b63b6d]" size={22} />}
                  </div>

                  <h2 className="text-2xl font-black text-[#b63b6d]">{plano.nome}</h2>
                  <p className="mt-1 font-bold text-[#6f4b5a]">{plano.subtitulo}</p>
                  <p className="mt-3 text-xl font-black text-[#3f2631]">
                    {formatarMoeda(plano.valor)}
                  </p>
                  <p className="mt-3 text-sm font-medium leading-relaxed text-[#7a5b66]">
                    {plano.descricao}
                  </p>

                  <span
                    className={`mt-auto inline-flex items-center justify-center rounded-lg px-4 py-3 font-bold transition-colors ${
                      selecionado
                        ? "bg-[#b63b6d] text-white"
                        : "bg-[#fff0f4] text-[#b63b6d]"
                    }`}
                  >
                    {selecionado ? "Plano selecionado" : "Selecionar plano"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="self-start rounded-2xl border border-[#f3d7df] bg-white p-6 shadow-md md:sticky md:top-36">
          <div className="mb-5 flex items-center gap-3">
            <PackageCheck className="text-[#b63b6d]" size={24} />
            <h2 className="text-2xl font-black">Resumo</h2>
          </div>

          <div className="rounded-2xl bg-[#fff0f4] p-4">
            <span className="text-xs font-black uppercase tracking-widest text-[#b63b6d]">
              Plano escolhido
            </span>
            <strong className="mt-1 block text-3xl text-rosa-text">{planoAtual.nome}</strong>
            <span className="mt-2 block text-lg font-black text-[#b63b6d]">
              {formatarMoeda(planoAtual.valor)}
            </span>
          </div>

          <div className="mt-5 space-y-3 text-sm font-semibold">
            {assinaturaAtiva && (
              <div className="rounded-lg border border-[#f3d7df] bg-[#fff7f8] px-3 py-2 text-[#6f4b5a]">
                Você já tem uma assinatura ativa: {assinaturaAtiva.tipoPlano}.
              </div>
            )}
            {isAdmin && (
              <div className="rounded-lg border border-[#f3d7df] bg-[#fff7f8] px-3 py-2 text-[#6f4b5a]">
                Faça login para contratar um plano.
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleIniciarCompra}
            disabled={!!carregandoPlano || verificandoAssinatura || !!assinaturaAtiva || isAdmin}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#b63b6d] px-6 py-3 font-bold text-white shadow-sm transition-colors hover:bg-[#8f2b53] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {carregandoPlano || verificandoAssinatura ? <Loader2 className="animate-spin" size={18} /> : <CheckCircle2 size={18} />}
            {isAdmin ? "Disponível para clientes" : assinaturaAtiva ? "Assinatura ativa" : "Iniciar compra"}
          </button>

          {erro && (
            <div className="mt-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {erro}
            </div>
          )}

        </aside>
      </section>

      {modalAberto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-black text-black">Personalizar assinatura</h2>
                <p className="mt-1 text-sm font-medium text-[#6f4b5a]">
                  {planoAtual.nome} - {planoAtual.subtitulo}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#f3d7df] text-[#6f4b5a] transition hover:bg-[#fff0f4]"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#3f2631]">Estilo do arranjo</span>
                <select
                  value={personalizacao.estiloArranjo}
                  onChange={(event) =>
                    setPersonalizacao((atual) => ({
                      ...atual,
                      estiloArranjo: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#f3d7df] bg-white px-4 py-3 text-sm font-semibold text-[#3f2631] outline-none transition focus:border-[#b63b6d] focus:ring-2 focus:ring-[#f2bfd0]"
                >
                  <option>Delicado</option>
                  <option>Romântico</option>
                  <option>Colorido</option>
                  <option>Moderno</option>
                  <option>Surpresa da floricultura</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#3f2631]">Cores preferidas</span>
                <select
                  value={personalizacao.coresPreferidas}
                  onChange={(event) =>
                    setPersonalizacao((atual) => ({
                      ...atual,
                      coresPreferidas: event.target.value,
                    }))
                  }
                  className="w-full rounded-xl border border-[#f3d7df] bg-white px-4 py-3 text-sm font-semibold text-[#3f2631] outline-none transition focus:border-[#b63b6d] focus:ring-2 focus:ring-[#f2bfd0]"
                >
                  <option>Cores suaves</option>
                  <option>Cores vibrantes</option>
                  <option>Vermelho</option>
                  <option>Rosa e lilás</option>
                  <option>Sem preferência</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-bold text-[#3f2631]">Observação</span>
                <textarea
                  value={personalizacao.observacao}
                  onChange={(event) =>
                    setPersonalizacao((atual) => ({
                      ...atual,
                      observacao: event.target.value,
                    }))
                  }
                  rows={3}
                  placeholder="Ex.: evitar flores muito perfumadas"
                  className="w-full resize-none rounded-xl border border-[#f3d7df] bg-white px-4 py-3 text-sm font-medium text-[#3f2631] outline-none transition placeholder:text-[#9f7f8c] focus:border-[#b63b6d] focus:ring-2 focus:ring-[#f2bfd0]"
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                className="rounded-full border border-[#f3d7df] px-5 py-3 text-sm font-bold text-[#6f4b5a] transition hover:bg-[#fff0f4]"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAdicionarAoCarrinho}
                disabled={!!carregandoPlano}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#b63b6d] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f2b53] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {carregandoPlano ? <Loader2 className="animate-spin" size={17} /> : <CheckCircle2 size={17} />}
                Adicionar ao carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default AssinaturasPage;
