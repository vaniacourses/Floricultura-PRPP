import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import { Loader2 } from "lucide-react";

type PerfilCliente = {
  tipo: "PF" | "PJ";
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  nascimento?: string;
  cidade?: string;
  razaoSocial?: string;
  cnpj?: string;
};

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  cnpj: string;
  dataNascimento: string;
  cidade: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  uf: string;
  complemento: string;
}

const ClienteRegistroPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [tipoCliente, setTipoCliente] = useState<"PF" | "PJ" | null>(null);

  const [formData, setFormData] = useState<FormData>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    cnpj: "",
    dataNascimento: "",
    cidade: "",
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    uf: "",
    complemento: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/cliente-registro-google");
      return;
    }
    if (!isAuthenticated) {
      login(token);
    }
    api.get<PerfilCliente>("/clientes/me")
      .then(data => {
        setTipoCliente(data.tipo);
        setFormData(prev => ({
          ...prev,
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
          cpf: data.cpf || "",
          cnpj: data.cnpj || "",
          dataNascimento: data.nascimento || "",
          cidade: data.cidade || "",
        }));
      })
      .catch(() => console.log("Novo usuário"));
  }, [navigate, login, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tipoCliente === "PF" && formData.cpf.length !== 11) return alert("CPF deve ter 11 dígitos");
    if (tipoCliente === "PJ" && formData.cnpj.length !== 14) return alert("CNPJ deve ter 14 dígitos");
    if (formData.cep.length !== 8) return alert("CEP deve ter 8 dígitos");

    setLoading(true);
    try {
      // Atualiza perfil com os campos do tipo real
      const payloadPerfil = tipoCliente === "PF"
        ? { tipo: "PF", nome: formData.nome, email: formData.email, telefone: formData.telefone, cpf: formData.cpf, nascimento: formData.dataNascimento, cidade: formData.cidade }
        : { tipo: "PJ", nome: formData.nome, email: formData.email, telefone: formData.telefone, razaoSocial: formData.nome, cnpj: formData.cnpj };

      await api.put("/clientes/me", payloadPerfil);

      // Cria o endereço principal
      const enderecoPayload = {
        cep: formData.cep,
        rua: formData.rua,
        numero: formData.numero,
        bairro: formData.bairro,
        cidade: formData.cidade,
        uf: formData.uf,
        complemento: formData.complemento,
      };
      await api.post("/clientes/me/enderecos", enderecoPayload);

      alert("Cadastro concluído!");
      const token = localStorage.getItem("token");
      if (token && !isAuthenticated) login(token);
      navigate("/cliente/perfil");
    } catch (err: any) {
      alert("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!tipoCliente) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-rosa-claro">
        <Loader2 className="animate-spin text-rosa-choque" size={48} />
      </div>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-rosa-claro p-6 py-12 font-menu text-left">
      <section className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-8 md:p-12 border border-rosa-pastel">
        <header className="text-center mb-8">
          <h1 className="font-logo text-7xl text-rosa-choque mb-2">registro</h1>
          <p className="uppercase text-[12px] font-bold text-rosa-text opacity-70">
            Complete seu cadastro
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">
                {tipoCliente === "PF" ? "Nome Completo" : "Razão Social"}
              </label>
              <input name="nome" value={formData.nome} onChange={handleChange} required className="p-4 border-2 border-rosa-pastel rounded-2xl bg-gray-50 outline-none focus:border-rosa-medio transition-all" />
            </div>
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">E-mail</label>
              <input name="email" value={formData.email} readOnly className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-100 text-gray-400 cursor-not-allowed outline-none" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">
                {tipoCliente === "PF" ? "CPF" : "CNPJ"}
              </label>
              <input
                name={tipoCliente === "PF" ? "cpf" : "cnpj"}
                value={tipoCliente === "PF" ? formData.cpf : formData.cnpj}
                onChange={handleChange}
                maxLength={tipoCliente === "PF" ? 11 : 14}
                placeholder="Somente números"
                required
                className="p-4 border-2 border-rosa-pastel rounded-2xl outline-none focus:border-rosa-medio transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">Telefone</label>
              <input name="telefone" value={formData.telefone} onChange={handleChange} maxLength={11} placeholder="DDD + Número" required className="p-4 border-2 border-rosa-pastel rounded-2xl outline-none focus:border-rosa-medio transition-all" />
            </div>
          </div>
          {tipoCliente === "PF" && (
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">Data de Nascimento</label>
              <input type="date" name="dataNascimento" value={formData.dataNascimento} onChange={handleChange} required className="p-4 border-2 border-rosa-pastel rounded-2xl outline-none focus:border-rosa-medio text-gray-500" />
            </div>
          )}
          <hr className="border-rosa-pastel/30 my-2" />
          <h3 className="text-rosa-choque font-bold text-sm uppercase ml-1">Endereço Principal</h3>
          {/* ... (campos de endereço permanecem iguais) ... */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-[12px] mb-1">CEP</label>
              <input name="cep" value={formData.cep} onChange={handleChange} maxLength={8} placeholder="00000000" required className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-rosa-text font-black text-[12px] mb-1">Rua</label>
              <input name="rua" value={formData.rua} onChange={handleChange} required className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-[12px] mb-1">Número</label>
              <input name="numero" value={formData.numero} onChange={handleChange} required className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-rosa-text font-black text-[12px] mb-1">Bairro</label>
              <input name="bairro" value={formData.bairro} onChange={handleChange} required className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col col-span-3">
              <label className="text-rosa-text font-black text-[12px] mb-1">Cidade</label>
              <input name="cidade" value={formData.cidade} onChange={handleChange} required className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
            </div>
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-[12px] mb-1">UF</label>
              <input name="uf" value={formData.uf} onChange={handleChange} maxLength={2} placeholder="EX" required className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio uppercase" />
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-rosa-text font-black text-sm mb-1 ml-1">Complemento</label>
            <input name="complemento" value={formData.complemento} onChange={handleChange} placeholder="Apto, bloco, etc." className="p-4 border-2 border-rosa-pastel rounded-2xl outline-none focus:border-rosa-medio transition-all" />
          </div>
          <button type="submit" className="w-full bg-rosa-choque text-white font-black py-4 rounded-full mt-6 shadow-xl active:scale-95 uppercase tracking-widest text-sm hover:bg-rosa-text transition-all">
            {loading ? "Salvando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ClienteRegistroPage;