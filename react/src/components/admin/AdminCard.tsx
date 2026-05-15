import axios from "axios";
import { Mail, Pencil, ShieldCheck, Trash2 } from "lucide-react";
import type { Administrador } from "./Administradores";

export const renderAdministrador = (
  admin: Administrador,
  removerAdministrador: (adminId: number) => void,
  onEdit: (admin: Administrador) => void
) => {
  return (
    <div
      key={admin.usuarioId}
      className="rounded-2xl bg-white p-6 shadow-sm border border-[#FFD6E5] hover:shadow-md transition-all duration-200"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFE3ED]">
            <ShieldCheck size={30} className="text-[#B03A61]" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#490829]">{admin.nome}</h2>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
              <Mail size={15} />
              {admin.email}
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-[#FFF5F8] px-4 py-3">
                <p className="text-xs font-medium uppercase text-gray-400">Nível de acesso</p>
                <p className="mt-1 font-semibold text-[#B03A61]">{admin.nivelAcesso}</p>
              </div>
              <div className="rounded-xl bg-[#FFF5F8] px-4 py-3">
                <p className="text-xs font-medium uppercase text-gray-400">Desde</p>
                <p className="mt-1 font-semibold text-[#490829]">{admin.createdAt}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onEdit(admin)}
            className="flex items-center gap-2 rounded-xl border border-[#FFD6E5] px-4 py-2 text-sm font-medium text-[#490829] hover:bg-[#FFF3F7] transition-all duration-200"
          >
            <Pencil size={16} />
            Editar
          </button>
          <button
            
            onClick={() => {
                const confirmar = window.confirm(
                  `Tem certeza que deseja excluir ${admin.nome}?`);

                if (confirmar) {
                  removerAdministrador(admin.usuarioId);
                }
            }}
            
            className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-100 transition-all duration-200"
          >
            <Trash2 size={16} />
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};

// ---

type Props = {
  modo: "criar" | "editar";
  adminAtual?: Administrador;
  onFechar: () => void;
  buscarAdministradores?: () => Promise<void>;
};

export function FormAdmin({ modo, adminAtual, onFechar, buscarAdministradores }: Props) {
  const ehEdicao = modo === "editar" && adminAtual;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const nome = (form.elements.namedItem("nome") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const nivel = (form.elements.namedItem("nivel") as HTMLSelectElement).value;

    if (!nome || !email || !nivel) {
      alert("Preencha todos os campos.");
      return;
    }

    try {
      const payload = { nome, email, nivelAcesso: nivel };

      if (ehEdicao) {
        await axios.put(`http://localhost:8080/administrador/${adminAtual.usuarioId}`, payload);
        alert("Administrador atualizado!");
      } else {
        await axios.post("http://localhost:8080/administrador", payload);
        alert("Administrador cadastrado!");
      }

      onFechar();
      if (buscarAdministradores) await buscarAdministradores();
    } catch (err) {
      console.error(err);
      alert("Algo deu errado, tenta de novo.");
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#490829]/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onFechar()}
    >
      <div className="w-full max-w-md rounded-2xl border-2 border-[#FFC7DB] bg-[#FFEEF2] p-8 shadow-2xl">
        <div className="mb-6 flex items-center justify-between border-b-2 border-[#FFC7DB] pb-4">
          <h2 className="text-2xl font-bold text-[#490829]">
            {ehEdicao ? "Editar Administrador" : "Adicionar Administrador"}
          </h2>
          <button onClick={onFechar} className="text-2xl text-[#490829] hover:opacity-70">
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-[#490829]">Nome completo</span>
            <input
              name="nome"
              type="text"
              placeholder="Digite o nome"
              defaultValue={adminAtual?.nome ?? ""}
              required
              className="rounded-lg border-2 border-[#FFC7DB] bg-white px-3 py-3 text-[#490829] outline-none focus:border-[#B03A61]"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-[#490829]">E-mail</span>
            <input
              name="email"
              type="email"
              placeholder="Digite o e-mail"
              defaultValue={adminAtual?.email ?? ""}
              required
              className="rounded-lg border-2 border-[#FFC7DB] bg-white px-3 py-3 text-[#490829] outline-none focus:border-[#B03A61]"
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className="text-sm font-semibold text-[#490829]">Nível de acesso</span>
            <select
              name="nivel"
              required
              defaultValue={adminAtual?.nivelAcesso ?? ""}
              className="rounded-lg border-2 border-[#FFC7DB] bg-white px-3 py-3 text-[#490829] outline-none focus:border-[#B03A61]"
            >
              <option value="">Selecionar nível...</option>
              <option value="SUPER_ADMIN">SUPER ADMIN</option>
              <option value="GERENTE">GERENTE</option>
              <option value="ATENDENTE">ATENDENTE</option>
            </select>
          </label>

          <button
            type="submit"
            className="mt-2 rounded-lg bg-gradient-to-br from-[#B03A61] to-[#490829] py-3 font-bold text-white hover:opacity-90"
          >
            {ehEdicao ? "Salvar alterações" : "Confirmar cadastro"}
          </button>
        </form>
      </div>
    </div>
  );
}