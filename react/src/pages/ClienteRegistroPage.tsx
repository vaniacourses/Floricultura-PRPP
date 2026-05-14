import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext";

// Tipo usado para carregar dados do perfil vindo do back-end
type PerfilPF = {
  tipo: "PF";
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  nascimento: string;
  cidade: string;
  membroDesde: string;
  ativo: boolean;
};

// Estado local do formulário
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
}

const ClienteRegistroPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [tipoPessoa, setTipoPessoa] = useState<"PF" | "PJ">("PF");

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
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/cliente-registro-google");
      return;
    }
    // Se o contexto ainda não está marcado como autenticado, mas há token, atualiza
    if (!isAuthenticated) {
      login(token);
    }
    // Carrega dados atuais do perfil (se já existir)
    api.get<PerfilPF>("/clientes/me")
      .then(data => {
        setFormData(prev => ({
          ...prev,
          nome: data.nome || "",
          email: data.email || "",
          telefone: data.telefone || "",
          cpf: data.cpf || "",
          dataNascimento: data.nascimento || "",
          cidade: data.cidade || "",
        }));
      })
      .catch(() => console.log("Novo usuário, sem dados prévios"));
  }, [navigate, login, isAuthenticated]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validações básicas
    if (tipoPessoa === "PF" && formData.cpf.length !== 11) return alert("CPF deve ter 11 dígitos");
    if (tipoPessoa === "PJ" && formData.cnpj.length !== 14) return alert("CNPJ deve ter 14 dígitos");
    if (formData.cep.length !== 8) return alert("CEP deve ter 8 dígitos");

    setLoading(true);
    try {
      const payload = tipoPessoa === "PF"
        ? {
            tipo: "PF",
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            cpf: formData.cpf,
            nascimento: formData.dataNascimento,
            cidade: formData.cidade,
          }
        : {
            tipo: "PJ",
            nome: formData.nome,
            email: formData.email,
            telefone: formData.telefone,
            cnpj: formData.cnpj,
          };

      await api.put("/clientes/me", payload);
      alert("Cadastro atualizado com sucesso!");

      // Garante que o contexto reflita o estado autenticado (importante se o token já estava salvo mas o contexto não foi atualizado)
      const token = localStorage.getItem("token");
      if (token && !isAuthenticated) {
        login(token);
      }

      navigate("/cliente/perfil");
    } catch (err: any) {
      alert("Erro: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-rosa-claro p-6 py-12 font-menu text-left">
      <section className="bg-white w-full max-w-2xl rounded-[40px] shadow-2xl p-8 md:p-12 border border-rosa-pastel">
        <header className="text-center mb-8">
          <h1 className="font-logo text-7xl text-rosa-choque mb-0">Registro</h1>
          <p className="uppercase text-[10px] font-bold text-rosa-text opacity-70">Preencha seus dados</p>
        </header>

        {/* SELETOR PF / PJ */}
        <div className="flex bg-rosa-claro/50 p-1.5 rounded-2xl mb-8 border border-rosa-pastel">
          <button
            type="button"
            onClick={() => setTipoPessoa("PF")}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-black transition-all ${tipoPessoa === "PF" ? "bg-rosa-choque text-white shadow-lg" : "text-rosa-text"}`}
          >
            PESSOA FÍSICA
          </button>
          <button
            type="button"
            onClick={() => setTipoPessoa("PJ")}
            className={`flex-1 py-2.5 rounded-xl text-[13px] font-black transition-all ${tipoPessoa === "PJ" ? "bg-rosa-choque text-white shadow-lg" : "text-rosa-text"}`}
          >
            PESSOA JURÍDICA
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">Nome / Razão Social</label>
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                className="p-4 border-2 border-rosa-pastel rounded-2xl bg-gray-50 outline-none focus:border-rosa-medio transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">E-mail</label>
              <input
                name="email"
                value={formData.email}
                readOnly
                className="p-4 border-2 border-gray-100 rounded-2xl bg-gray-100 text-gray-400 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">
                {tipoPessoa === "PF" ? "CPF" : "CNPJ"}
              </label>
              <input
                name={tipoPessoa === "PF" ? "cpf" : "cnpj"}
                value={tipoPessoa === "PF" ? formData.cpf : formData.cnpj}
                onChange={handleChange}
                maxLength={tipoPessoa === "PF" ? 11 : 14}
                placeholder="Somente números"
                required
                className="p-4 border-2 border-rosa-pastel rounded-2xl outline-none focus:border-rosa-medio transition-all"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">Telefone</label>
              <input
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                maxLength={11}
                placeholder="DDD + Número"
                required
                className="p-4 border-2 border-rosa-pastel rounded-2xl outline-none focus:border-rosa-medio transition-all"
              />
            </div>
          </div>

          {tipoPessoa === "PF" && (
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-sm mb-1 ml-1">Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={formData.dataNascimento}
                onChange={handleChange}
                required
                className="p-4 border-2 border-rosa-pastel rounded-2xl outline-none focus:border-rosa-medio text-gray-500"
              />
            </div>
          )}

          <hr className="border-rosa-pastel/30 my-2" />
          <h3 className="text-rosa-choque font-bold text-sm uppercase ml-1">Endereço</h3>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-[12px] mb-1">CEP</label>
              <input
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                maxLength={8}
                placeholder="00000000"
                required
                className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-rosa-text font-black text-[12px] mb-1">Rua</label>
              <input
                name="rua"
                value={formData.rua}
                onChange={handleChange}
                required
                className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-[12px] mb-1">Número</label>
              <input
                name="numero"
                value={formData.numero}
                onChange={handleChange}
                required
                className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio"
              />
            </div>
            <div className="flex flex-col col-span-2">
              <label className="text-rosa-text font-black text-[12px] mb-1">Bairro</label>
              <input
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                required
                className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio"
              />
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col col-span-3">
              <label className="text-rosa-text font-black text-[12px] mb-1">Cidade</label>
              <input
                name="cidade"
                value={formData.cidade}
                onChange={handleChange}
                required
                className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-rosa-text font-black text-[12px] mb-1">UF</label>
              <input
                name="uf"
                value={formData.uf}
                onChange={handleChange}
                maxLength={2}
                placeholder="EX"
                required
                className="p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio uppercase"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-rosa-choque text-white font-black py-4 rounded-full mt-6 shadow-xl active:scale-95 uppercase tracking-widest text-sm hover:bg-rosa-text transition-all"
          >
            {loading ? "Salvando..." : "Finalizar Cadastro"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default ClienteRegistroPage;