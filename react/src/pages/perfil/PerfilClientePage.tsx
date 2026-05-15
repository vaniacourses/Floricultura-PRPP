import React, { useState, useEffect } from "react";
import { Mail, Phone, User, Calendar, MapPin, Edit3, Loader2 } from "lucide-react";
import { api } from "../../services/api";

// Tipagem dos dados recebidos do back‑end (PF)
type PerfilPF = {
  tipo: "PF";
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  nascimento: string; // formato ISO "1995-05-15"
  membroDesde: string; // pode vir como ISO ou string formatada
  ativo: boolean;
};

const PerfilClientePage = () => {
  const [perfil, setPerfil] = useState<PerfilPF | null>(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<PerfilPF | null>(null);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  const carregarPerfil = async () => {
    try {
      const data = await api.get<PerfilPF>("/clientes/me");
      setPerfil(data);
      setForm({ ...data });
    } catch (e: any) {
      setErro(e.message || "Erro ao carregar perfil");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (campo: keyof PerfilPF, valor: string) => {
    setForm(prev => (prev ? { ...prev, [campo]: valor } : prev));
  };

  const handleSalvar = async () => {
    if (!form) return;
    setSalvando(true);
    try {
      const updated = await api.put<PerfilPF>("/clientes/me", form);
      setPerfil(updated);
      setEditando(false);
    } catch (e: any) {
      alert(e.message);
    } finally {
      setSalvando(false);
    }
  };

  const formatarData = (iso: string) => {
    if (!iso || !iso.includes("-")) return iso || "";
    const [ano, mes, dia] = iso.split("-");
    return `${dia}/${mes}/${ano}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-rosa-choque" size={48} />
      </div>
    );
  }

  if (erro || !perfil) {
    return (
      <div className="text-center text-red-500 font-bold p-10">
        {erro || "Perfil não encontrado."}
      </div>
    );
  }

  const dadosExibicao = editando ? form! : perfil;

  return (
    <div className="animate-in fade-in duration-500">
      <header className="mb-10">
        <h1 className="font-logo text-7xl text-rosa-choque">Meu Perfil</h1>
        <p className="text-rosa-text opacity-70 font-bold uppercase tracking-widest text-xs">
          Gerencie suas informações pessoais e de contato
        </p>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 bg-white rounded-[40px] p-10 shadow-xl border border-rosa-pastel">
          <div className="flex justify-between items-center mb-8 border-b border-rosa-claro pb-4">
            <h3 className="text-rosa-choque font-black uppercase text-lg">Dados da Conta</h3>
            <button
              onClick={() => setEditando(!editando)}
              className="flex items-center gap-2 text-rosa-text hover:text-rosa-choque transition-colors font-bold text-sm"
            >
              <Edit3 size={18} /> {editando ? "Cancelar" : "Editar"}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-8">
              <InfoItem icon={<User />} label="Nome Completo" value={dadosExibicao.nome} editando={editando} onChange={(v) => handleChange("nome", v)} />
              <InfoItem icon={<Mail />} label="E-mail Principal" value={dadosExibicao.email} />
              <InfoItem icon={<Phone />} label="Telefone / WhatsApp" value={dadosExibicao.telefone} editando={editando} onChange={(v) => handleChange("telefone", v)} />
            </div>
            <div className="space-y-8">
              <InfoItem icon={<User />} label="CPF" value={dadosExibicao.cpf} />
              <InfoItem
                icon={<Calendar />}
                label="Data de Nascimento"
                value={editando ? dadosExibicao.nascimento : formatarData(dadosExibicao.nascimento)}
                editando={editando}
                type="date"
                onChange={(v) => handleChange("nascimento", v)}
              />
            </div>
          </div>

          {editando && (
            <div className="mt-12 pt-8 border-t border-rosa-claro flex justify-end">
              <button
                onClick={handleSalvar}
                disabled={salvando}
                className="px-10 py-4 bg-rosa-choque text-white rounded-full font-black text-xs uppercase hover:bg-rosa-text transition-all shadow-lg active:scale-95 disabled:opacity-50 flex items-center gap-2"
              >
                {salvando && <Loader2 className="animate-spin" size={16} />}
                Salvar Alterações
              </button>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-rosa-medio/20 rounded-[40px] p-8 border border-rosa-pastel/50">
            <h3 className="text-rosa-text font-black uppercase text-sm mb-6">Segurança</h3>
            <p className="text-xs text-rosa-text opacity-70 mb-4">Mantenha sua conta protegida alterando sua senha regularmente.</p>
            <button className="w-full py-3 bg-white text-rosa-choque border border-rosa-pastel rounded-2xl font-bold text-xs uppercase hover:bg-rosa-claro transition-all">
              Alterar Senha
            </button>
          </div>

          <div className="bg-white rounded-[40px] p-8 border border-rosa-pastel shadow-md text-center">
            <p className="text-[10px] uppercase font-black text-rosa-text opacity-40 mb-2">Membro do clube desde</p>
            <p className="font-bold text-rosa-text text-xl">{perfil.membroDesde}</p>
            <div className={`mt-4 inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase ${perfil.ativo ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"}`}>
              {perfil.ativo ? "Conta Ativa" : "Conta Inativa"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente InfoItem (com suporte a edição)
interface InfoItemProps {
  icon: React.ReactElement;
  label: string;
  value: string;
  editando?: boolean;
  onChange?: (valor: string) => void;
  type?: string;
}

const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, editando = false, onChange, type = "text" }) => (
  <div className="flex items-start gap-4">
    <div className="p-3 bg-rosa-claro rounded-2xl text-rosa-choque shadow-sm shrink-0">
      {React.cloneElement(icon, { size: 20 } as any)}
    </div>
    <div className="flex-1">
      <p className="text-[10px] uppercase font-black text-rosa-text opacity-40 leading-none mb-1">{label}</p>
      {editando && onChange ? (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full font-bold text-rosa-text text-lg leading-tight bg-rosa-claro/30 border border-rosa-pastel rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rosa-choque"
        />
      ) : (
        <p className="font-bold text-rosa-text text-lg leading-tight">{value}</p>
      )}
    </div>
  </div>
);

export default PerfilClientePage;