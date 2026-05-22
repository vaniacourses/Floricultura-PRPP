import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../../services/api";              
import { FormAdmin, renderAdministrador } from "./AdminCard";

export interface Administrador {
  usuarioId: number;
  nome: string;
  email: string;
  nivelAcesso: string;
  createdAt: string;
}

const Administradores = () => {
  const [administradores, setAdministradores] = useState<Administrador[]>([]);
  const [modal, setModal] = useState<{ modo: "criar" | "editar"; admin?: Administrador } | null>(null);

  useEffect(() => {
    buscarAdministradores();
  }, []);

  const buscarAdministradores = async () => {
    try {
      const response = await api.get<Administrador[]>("/administrador");
      setAdministradores(response);   // sem .data
    } catch (error) {
      console.error("Erro ao buscar administradores:", error);
    }
  };

  const removerAdministrador = async (adminId: number) => {
    try {
      await api.delete(`/administrador/${adminId}`);
      buscarAdministradores();
    } catch {
      alert("Erro ao remover administrador");
    }
  };

  return (
    <main className="min-h-screen bg-[#FFEEF2] p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#490829]">Administradores</h1>
          <p className="mt-1 text-sm text-[#B03A61]">Gerencie os administradores do sistema</p>
        </div>

        <button
          onClick={() => setModal({ modo: "criar" })}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-br from-[#B03A61] to-[#490829] px-4 py-2 font-semibold text-white hover:opacity-90"
        >
          <Plus size={18} />
          Novo administrador
        </button>
      </div>

      <section className="grid gap-5">
        {administradores.map((admin) =>
          renderAdministrador(
            admin,
            removerAdministrador,
            (adminEdit) => setModal({ modo: "editar", admin: adminEdit })
          )
        )}
      </section>

      {modal && (
        <FormAdmin
          modo={modal.modo}
          adminAtual={modal.admin}
          onFechar={() => setModal(null)}
          buscarAdministradores={buscarAdministradores}
        />
      )}
    </main>
  );
};

export default Administradores;