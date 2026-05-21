import React, { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  User,
  ShieldCheck,
  Edit3,
  Loader2,
} from "lucide-react";

import { api } from "../../services/api";

type PerfilAdministrador = {
  usuarioId: number;
  nome: string;
  email: string;
  telefone: string;
  nivelAcesso: string;
};

const PerfilAdministradorPage = () => {
  const [perfil, setPerfil] = useState<PerfilAdministrador | null>(null);
  const [form, setForm] = useState<PerfilAdministrador | null>(null);

  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [editando, setEditando] = useState(false);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      /*
      const data = await api.get<PerfilAdministrador>(
        "/administrador/me"
      );

      setPerfil(data);
      setForm({ ...data });
      */

      const fakeData = {
        usuarioId: 1,
        nome: "Isabella",
        email: "isa@gmail.com",
        telefone: "(21) 99999-9999",
        nivelAcesso: "SUPER_ADMIN",
      };

      setPerfil(fakeData);
      setForm(fakeData);

    } catch (e: any) {
      setErro(e.message || "Erro ao carregar perfil");

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    campo: keyof PerfilAdministrador,
    valor: string
  ) => {
    setForm((prev) =>
      prev ? { ...prev, [campo]: valor } : prev
    );
  };

  const handleSalvar = async () => {
    if (!form) return;

    setSalvando(true);

    try {
      const updated = await api.put<PerfilAdministrador>(
        "/administrador/me",
        form
      );

      setPerfil(updated);
      setEditando(false);

    } catch (e: any) {
      alert(e.message);

    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rosa-claro flex justify-center items-center">
        <Loader2
          className="animate-spin text-rosa-choque"
          size={48}
        />
      </div>
    );
  }

  if (erro || !perfil) {
    return (
      <div className="min-h-screen bg-rosa-claro flex items-center justify-center">
        <div className="text-red-500 font-bold text-lg">
          {erro || "Perfil não encontrado"}
        </div>
      </div>
    );
  }

  const dadosExibicao = editando ? form! : perfil;

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu text-rosa-text">

      <div className="max-w-5xl mx-auto">

        <header className="text-center mb-10">
          <h1 className="font-logo text-7xl text-rosa-choque mb-2">
            Meu Perfil
          </h1>

          <p className="uppercase tracking-widest text-sm opacity-80">
            Gerencie suas informações administrativas
          </p>
        </header>

        <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-rosa-pastel">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-8 bg-rosa-choque rounded-full"></span>
              Dados da Conta
            </h2>

            <button
              onClick={() => setEditando(!editando)}
              className="flex items-center gap-2 text-rosa-text hover:text-rosa-choque transition-colors font-bold"
            >
              <Edit3 size={18} />

              {editando ? "Cancelar" : "Editar"}
            </button>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <InfoItem
              icon={<User />}
              label="Nome"
              value={dadosExibicao.nome}
              editando={editando}
              onChange={(v) => handleChange("nome", v)}
            />

            <InfoItem
              icon={<Mail />}
              label="E-mail"
              value={dadosExibicao.email}
            />

            <InfoItem
              icon={<Phone />}
              label="Telefone"
              value={dadosExibicao.telefone}
              editando={editando}
              onChange={(v) => handleChange("telefone", v)}
            />

            <InfoItem
              icon={<ShieldCheck />}
              label="Nível de Acesso"
              value={dadosExibicao.nivelAcesso}
            />

          </div>

          {editando && (
            <div className="flex gap-4 mt-10">

              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="bg-rosa-choque text-white px-8 py-3 rounded-full font-bold hover:bg-rosa-text transition-colors shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {salvando && (
                  <Loader2 className="animate-spin" size={18} />
                )}

                Salvar Alterações
              </button>

              <button
                onClick={() => {
                  setEditando(false);
                  setForm(perfil);
                }}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>

            </div>
          )}

        </section>

      </div>

    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: string;
  editando?: boolean;
  onChange?: (valor: string) => void;
}

const InfoItem: React.FC<InfoItemProps> = ({
  icon,
  label,
  value,
  editando = false,
  onChange,
}) => (
  <div className="flex flex-col">

    <label className="font-semibold mb-2 flex items-center gap-2">
      <span className="text-rosa-choque">
        {React.cloneElement(icon, { size: 18 } as any)}
      </span>

      {label}
    </label>

    {editando && onChange ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
      />
    ) : (
      <div className="p-3 border-2 border-rosa-pastel rounded-xl bg-rosa-claro/30 font-semibold min-h-[52px] flex items-center">
        {value}
      </div>
    )}

  </div>
);

export default PerfilAdministradorPage;