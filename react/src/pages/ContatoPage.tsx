import { Flower } from "lucide-react";


const integrantes = [
  { nome: "Amanda Lemos Ribas", iniciais: "AL" },
  { nome: "Isabella Direito Labre Martins", iniciais: "IL" },
  { nome: "Juliana Alves Poustka", iniciais: "JA" },
  { nome: "Lais Ferreira Nazareth", iniciais: "LF" },
  { nome: "Luiza Canto Furley Schmidt", iniciais: "LC" },
  { nome: "Maria Eduarda D'Angelo Quitete Vianna", iniciais: "ME" },
];

const ContatoPage = () => {
  return (
    <div className="min-h-screen bg-rosa-claro py-16 px-4">
      <div className="text-center mb-12">
        <p className="font-logo text-6xl text-rosa-choque mb-2">contato</p>
        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-20 bg-rosa-pastel" />
          <Flower size={24} className="mt-2 text-rosa-choque" />
          <div className="h-px w-20 bg-rosa-pastel" />
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        
        <div className="bg-white border border-rosa-pastel rounded-2xl px-8 py-6 text-center shadow-sm">
          <p className="text-rosa-text text-sm leading-relaxed">
            Esta página web é de caráter ficcional, realizada para o trabalho
            prático da disciplina{" "}
            <span className="font-semibold text-rosa-choque">
              Projeto de Software
            </span>{" "}
            cursada na{" "}
            <span className="font-semibold text-rosa-choque">
              Universidade Federal Fluminense (UFF)
            </span>
            , durante o período 2026.1.
            <span>
              ministrada pela professora{" "}
            </span>
            <span className="font-semibold text-rosa-choque">
              Vania Neves
            </span>
          </p>
        </div>

        <div className="bg-white border border-rosa-pastel rounded-2xl px-8 py-6 shadow-sm">
          <h2 className="text-rosa-choque font-semibold text-lg mb-5 text-center tracking-wide uppercase text-sm">
            Equipe
          </h2>

          <ul className="space-y-3">
            {integrantes.map((p) => (
              <li
                key={p.nome}
                className="flex items-center gap-4 py-2 border-b border-rosa-pastel/40 last:border-0"
              >
                <div className="w-9 h-9 rounded-full bg-rosa-pastel flex items-center justify-center flex-shrink-0">
                  <span className="text-rosa-choque font-semibold text-xs">
                    {p.iniciais}
                  </span>
                </div>
                <span className="text-rosa-text text-sm">{p.nome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-rosa-choque rounded-2xl px-8 py-6 text-center shadow-sm">
          <p className="text-rosa-pastel text-sm mb-3">
            Para mais informações, acesse o repositório do projeto:
          </p>
          <a
            href="https://github.com/vaniacourses/Floricultura-PRPP"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-rosa-choque font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-rosa-claro transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub do Projeto
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContatoPage;
