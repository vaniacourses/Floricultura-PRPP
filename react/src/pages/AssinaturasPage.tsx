import { useState } from "react";
import {
  CheckCircle2,
  PackageCheck,
  Sparkles,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const PLANOS = [
  {
    nome: "Semanal",
    subtitulo: "Flores sempre frescas",
    descricao: "Perfeito para quem quer manter a casa sempre renovada com flores fresquinhas.",
    beneficios: ["Entrega toda semana", "Arranjos compactos", "Ideal para rotina"],
  },
  {
    nome: "Quinzenal",
    subtitulo: "Flores a cada 15 dias",
    descricao: "Uma opção equilibrada para trazer delicadeza e cor ao seu espaço com frequência.",
    beneficios: ["Entrega quinzenal", "Seleção da estação", "Equilíbrio perfeito"],
  },
  {
    nome: "Mensal",
    subtitulo: "Renove o ambiente",
    descricao: "Ideal para transformar o mês com arranjos especiais e escolhidos com carinho.",
    beneficios: ["Entrega mensal", "Seleção da estação", "Ótimo custo-benefício"],
  },
];

const AssinaturasPage = () => {
  const navigate = useNavigate();
  const [planoSelecionado, setPlanoSelecionado] = useState("Mensal");

  const planoAtual = PLANOS.find((plano) => plano.nome === planoSelecionado) || PLANOS[1];

  const handleContratar = () => navigate("/cliente-login");

  return (
    <main className="min-h-screen bg-rosa-claro font-[Arial] text-rosa-text">
      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-8 md:grid-cols-[1fr_340px] md:py-12">
        <div>
          <div className="mb-8">
            <h1 className="font-logo text-6xl font-normal leading-none text-rosa-choque md:text-7xl">
              Assinaturas
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium opacity-80 md:text-lg">
              Escolha um plano e receba flores selecionadas para deixar sua rotina mais bonita.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {PLANOS.map((plano) => {
              const selecionado = planoSelecionado === plano.nome;

              return (
                <button
                  key={plano.nome}
                  type="button"
                  onClick={() => {
                    setPlanoSelecionado(plano.nome);
                  }}
                  className={`flex min-h-[300px] flex-col rounded-lg border bg-white p-5 text-left shadow-lg transition-shadow hover:shadow-xl ${
                    selecionado
                      ? "border-rosa-choque ring-2 ring-rosa-choque/20"
                      : "border-rosa-pastel"
                  }`}
                >
                  <div className="mb-4 flex justify-end">
                    {selecionado && <CheckCircle2 className="text-rosa-choque" size={22} />}
                  </div>

                  <h2 className="text-2xl font-black text-rosa-choque">{plano.nome}</h2>
                  <p className="mt-1 font-bold">{plano.subtitulo}</p>
                  <p className="mt-3 text-sm font-medium leading-relaxed opacity-80">
                    {plano.descricao}
                  </p>

                  <ul className="mt-5 space-y-3">
                    {plano.beneficios.map((beneficio) => (
                      <li key={beneficio} className="flex items-start gap-2 text-sm font-semibold">
                        <CheckCircle2 className="mt-0.5 shrink-0 text-rosa-choque" size={16} />
                        {beneficio}
                      </li>
                    ))}
                  </ul>

                  <span
                    className={`mt-auto inline-flex items-center justify-center rounded-lg px-4 py-3 font-bold transition-colors ${
                      selecionado
                        ? "bg-rosa-choque text-white"
                        : "bg-rosa-claro text-rosa-choque"
                    }`}
                  >
                    {selecionado ? "Plano selecionado" : "Escolher plano"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <aside className="self-start rounded-lg border border-rosa-pastel bg-white p-6 shadow-xl md:sticky md:top-36">
          <div className="mb-5 flex items-center gap-3">
            <PackageCheck className="text-rosa-choque" size={24} />
            <h2 className="text-2xl font-black">Resumo</h2>
          </div>

          <div className="rounded-lg bg-rosa-claro/60 p-4">
            <span className="text-xs font-black uppercase tracking-widest text-rosa-choque">
              Plano escolhido
            </span>
            <strong className="mt-1 block text-3xl text-rosa-text">{planoAtual.nome}</strong>
          </div>

          <div className="mt-5 space-y-3 text-sm font-semibold">
            <div className="flex items-center gap-3">
              <Sparkles className="text-rosa-choque" size={18} />
              Status inicial: Ativa
            </div>
          </div>

          <button
            type="button"
            onClick={handleContratar}
            className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-rosa-choque px-6 py-3 font-bold text-white shadow-lg transition-colors hover:bg-rosa-text"
          >
            <CheckCircle2 size={18} />
            Assinar este plano
          </button>
        </aside>
      </section>
    </main>
  );
};

export default AssinaturasPage;
