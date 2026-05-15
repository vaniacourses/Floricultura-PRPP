import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { renderAdministrador, renderFormAdmin } from "./AdminCard";

export interface Administrador {
  usuarioId: number;
  nome: string;
  email: string;
  nivelAcesso: string;
  createdAt: string;
}

const Administradores = () => {
  const [administradores, setAdministradores] = useState<Administrador[]>([]);

  useEffect(() => {
    buscarAdministradores();
  }, []);

  const buscarAdministradores = async () => {
    try {
      const response = await axios.get<Administrador[]>(
        "http://localhost:8080/administrador"
      );
      setAdministradores(response.data);
    } catch (error) {
      console.error("Erro ao buscar administradores:", error);
    }
  };

  const removerAdministrador = async (adminId: number) => {
    try {
      await axios.delete(`http://localhost:8080/administrador/${adminId}`);
      buscarAdministradores();
    } catch (error) {
      alert("Erro ao remover administrador");
    }
  };

  const abrirModalCriar = () => {
    renderFormAdmin("criar", undefined, buscarAdministradores);
  };

  const abrirModalEditar = (admin: Administrador) => {
    renderFormAdmin("editar", admin, buscarAdministradores);
  };

  return (
    <main className="min-h-screen bg-[#FFEEF2] p-6">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#490829]">
            Administradores
          </h1>
          <p className="mt-1 text-sm text-[#B03A61]">
            Gerencie os administradores do sistema
          </p>
        </div>

        <button
          onClick={abrirModalCriar}
          className="flex items-center gap-2 rounded-xl bg-[#B03A61] px-5 py-3 text-white font-medium shadow-md transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
        >
          <Plus size={18} />
          Novo administrador
        </button>
      </div>

      <section className="grid gap-5">
        {administradores.map((admin) =>
          renderAdministrador(admin, removerAdministrador, abrirModalEditar)
        )}
      </section>
    </main>
  );
};

export default Administradores;