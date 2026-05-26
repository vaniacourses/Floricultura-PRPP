import React, { useState, useEffect } from "react";
import { Mail, Phone, User, Calendar, Edit3, Loader2, Building2, FileText, Hash } from "lucide-react";
import { api } from "../../services/api";

type PerfilCliente = {
  tipo: "PF" | "PJ";
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  nascimento?: string;
  razaoSocial?: string;
  cnpj?: string;
};

const PerfilClientePage = () => {
  const [perfil, setPerfil] = useState<PerfilCliente | null>(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<PerfilCliente | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const data = await api.get<PerfilCliente>("/clientes/me");
      setPerfil(data);
      setForm({ ...data });
    } catch (e: any) {
      setErro(e.message || "Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo: keyof PerfilCliente, valor: string) => {
    setForm(prev => (prev ? { ...prev, [campo]: valor } : prev));
  };

  const handleSalvar = async () => {
    if (!form) return;
    setSalvando(true);
    try {
      const payload = {
        tipo: form.tipo,
        nome: form.nome,
        email: form.email,
        telefone: form.telefone,
        ...(form.tipo === "PF"
          ? { cpf: form.cpf, nascimento: form.nascimento }
          : { razaoSocial: form.razaoSocial, cnpj: form.cnpj }),
      };
      const updated = await api.put<PerfilCliente>("/clientes/me", payload);
      setPerfil(updated);
      setEditando(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSalvando(false);
    }
  };

  const formatarData = (valor: any): string => {
    if (!valor) return "";
    let str = String(valor);

    if (str.includes("-") && str.length >= 10) {
      const [ano, mes, dia] = str.split("-");
      return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
    }

    if (str.includes(",")) {
      const partes = str.split(",");
      if (partes.length === 3) {
        const [ano, mes, dia] = partes;
        return `${dia.padStart(2, "0")}/${mes.padStart(2, "0")}/${ano}`;
      }
    }

    if (/^\d+$/.test(str)) {
      const ts = Number(str);
      const data = new Date(ts);
      if (!isNaN(data.getTime())) {
        const dia = String(data.getDate()).padStart(2, "0");
        const mes = String(data.getMonth() + 1).padStart(2, "0");
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
      }
    }

    return str;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rosa-claro flex justify-center items-center">
        <Loader2 className="animate-spin text-rosa-choque" size={48} />
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
  const isPF = dadosExibicao.tipo === "PF";

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu text-rosa-text">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="font-logo text-7xl text-rosa-choque mb-2">meu perfil</h1>
          <p className="uppercase tracking-widest text-sm opacity-80">
            Gerencie suas informações pessoais e de contato
          </p>
        </header>

        <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 border border-rosa-pastel">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <span className="w-2 h-8 bg-rosa-choque rounded-full"></span>
              Dados da Conta ({isPF ? "Pessoa Física" : "Pessoa Jurídica"})
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
            <InfoItem icon={<User />} label="Nome Completo" value={dadosExibicao.nome} editando={editando} onChange={(v) => handleChange("nome", v)} />
            <InfoItem icon={<Mail />} label="E-mail Principal" value={dadosExibicao.email} />
            <InfoItem icon={<Phone />} label="Telefone / WhatsApp" value={dadosExibicao.telefone} editando={editando} onChange={(v) => handleChange("telefone", v)} />

            {isPF ? (
              <>
                <InfoItem icon={<Hash />} label="CPF" value={dadosExibicao.cpf || ""} editando={editando} onChange={(v) => handleChange("cpf", v)} />
                <InfoItem
                  icon={<Calendar />}
                  label="Data de Nascimento"
                  value={editando ? dadosExibicao.nascimento || "" : formatarData(dadosExibicao.nascimento || "")}
                  editando={editando}
                  type="date"
                  onChange={(v) => handleChange("nascimento", v)}
                />
              </>
            ) : (
              <>
                <InfoItem icon={<Building2 />} label="Razão Social" value={dadosExibicao.razaoSocial || ""} editando={editando} onChange={(v) => handleChange("razaoSocial", v)} />
                <InfoItem icon={<FileText />} label="CNPJ" value={dadosExibicao.cnpj || ""} editando={editando} onChange={(v) => handleChange("cnpj", v)} />
              </>
            )}
          </div>

          {editando && (
            <div className="flex gap-4 mt-10">
              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="bg-rosa-choque text-white px-8 py-3 rounded-full font-bold hover:bg-rosa-text transition-colors shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {salvando && <Loader2 className="animate-spin" size={18} />}
                Salvar Alterações
              </button>
              <button
                onClick={() => { setEditando(false); setForm(perfil); }}
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
  type?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, editando = false, onChange, type = "text" }) => (
  <div className="flex flex-col">
    <label className="font-semibold mb-2 flex items-center gap-2">
      <span className="text-rosa-choque">{React.cloneElement(icon, { size: 18 } as any)}</span>
      {label}
    </label>
    {editando && onChange ? (
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all" />
    ) : (
      <div className="p-3 border-2 border-rosa-pastel rounded-xl bg-rosa-claro/30 font-semibold min-h-[52px] flex items-center">{value}</div>
    )}
  </div>
);

export default PerfilClientePage;