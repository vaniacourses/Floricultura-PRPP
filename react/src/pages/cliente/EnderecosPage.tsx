import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { MapPin, Plus, Edit2, Trash2, Loader2 } from "lucide-react";

type Endereco = {
  id: number;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  uf: string;
  complemento?: string;
};

const EnderecosPage = () => {
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  // Controle do formulário (criação/edição)
  const [formVisivel, setFormVisivel] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    cep: "",
    rua: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: "",
    complemento: "",
  });

  useEffect(() => {
    carregarEnderecos();
  }, []);

  const carregarEnderecos = async () => {
    try {
      const data = await api.get<Endereco[]>("/clientes/me/enderecos");
      setEnderecos(data);
    } catch (e: any) {
      setErro(e.message || "Erro ao carregar endereços");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      cep: "",
      rua: "",
      numero: "",
      bairro: "",
      cidade: "",
      uf: "",
      complemento: "",
    });
    setEditandoId(null);
  };

  const abrirFormulario = (endereco?: Endereco) => {
    if (endereco) {
      setEditandoId(endereco.id);
      setFormData({
        cep: endereco.cep,
        rua: endereco.rua,
        numero: endereco.numero,
        bairro: endereco.bairro,
        cidade: endereco.cidade,
        uf: endereco.uf,
        complemento: endereco.complemento || "",
      });
    } else {
      resetForm();
    }
    setFormVisivel(true);
  };

  const fecharFormulario = () => {
    setFormVisivel(false);
    resetForm();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.cep.length !== 8) return alert("CEP deve ter 8 dígitos");
    if (formData.uf.length !== 2) return alert("UF deve ter 2 caracteres");

    try {
      if (editandoId) {
        await api.put(`/clientes/me/enderecos/${editandoId}`, formData);
      } else {
        await api.post("/clientes/me/enderecos", formData);
      }
      fecharFormulario();
      carregarEnderecos();
    } catch (err: any) {
      alert("Erro ao salvar endereço: " + err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este endereço?")) return;
    try {
      await api.delete(`/clientes/me/enderecos/${id}`);
      carregarEnderecos();
    } catch (err: any) {
      alert("Erro ao excluir: " + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-rosa-claro flex justify-center items-center">
        <Loader2 className="animate-spin text-rosa-choque" size={48} />
      </div>
    );
  }

  if (erro) {
    return (
      <div className="min-h-screen bg-rosa-claro flex items-center justify-center">
        <div className="text-red-500 font-bold text-lg">{erro}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu text-rosa-text">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="font-logo text-7xl text-rosa-choque mb-2">endereços</h1>
          <p className="uppercase tracking-widest text-sm opacity-80">
            Gerencie seus endereços de entrega
          </p>
        </header>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => abrirFormulario()}
            className="flex items-center gap-2 bg-rosa-choque text-white px-6 py-3 rounded-full font-bold hover:bg-rosa-text transition-colors shadow-lg active:scale-95"
          >
            <Plus size={20} />
            Novo Endereço
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enderecos.length === 0 ? (
            <p className="col-span-2 text-center text-rosa-text opacity-60">Nenhum endereço cadastrado.</p>
          ) : (
            enderecos.map(end => (
              <div
                key={end.id}
                className="bg-white rounded-3xl p-6 shadow-lg border border-rosa-pastel relative group hover:shadow-xl transition-all"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => abrirFormulario(end)} className="text-rosa-text hover:text-rosa-choque">
                    <Edit2 size={18} />
                  </button>
                  <button onClick={() => handleDelete(end.id)} className="text-red-400 hover:text-red-600">
                    <Trash2 size={18} />
                  </button>
                </div>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="text-rosa-choque mt-1" size={24} />
                  <div>
                    <p className="font-bold text-lg">{end.rua}, {end.numero}</p>
                    <p className="text-sm opacity-70">{end.bairro} – {end.cidade}/{end.uf}</p>
                    <p className="text-sm opacity-70">CEP: {end.cep}</p>
                    {end.complemento && <p className="text-sm opacity-70">Complemento: {end.complemento}</p>}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {formVisivel && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">            
          <div className="bg-white rounded-3xl p-8 max-w-lg w-full shadow-2xl border border-rosa-pastel">
              <h2 className="text-2xl font-bold text-rosa-choque mb-6">
                {editandoId ? "Editar Endereço" : "Novo Endereço"}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">CEP</label>
                    <input name="cep" value={formData.cep} onChange={handleChange} maxLength={8} required className="w-full p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">UF</label>
                    <input name="uf" value={formData.uf} onChange={handleChange} maxLength={2} required className="w-full p-3 border-2 border-rosa-pastel rounded-xl uppercase outline-none focus:border-rosa-medio" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Rua</label>
                  <input name="rua" value={formData.rua} onChange={handleChange} required className="w-full p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold mb-1">Número</label>
                    <input name="numero" value={formData.numero} onChange={handleChange} required className="w-full p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">Bairro</label>
                    <input name="bairro" value={formData.bairro} onChange={handleChange} required className="w-full p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-bold mb-1">Cidade</label>
                    <input name="cidade" value={formData.cidade} onChange={handleChange} required className="w-full p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-1">UF</label>
                    <input name="uf" value={formData.uf} onChange={handleChange} maxLength={2} required className="w-full p-3 border-2 border-rosa-pastel rounded-xl uppercase outline-none focus:border-rosa-medio" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Complemento (opcional)</label>
                  <input name="complemento" value={formData.complemento} onChange={handleChange} className="w-full p-3 border-2 border-rosa-pastel rounded-xl outline-none focus:border-rosa-medio" />
                </div>
                <div className="flex gap-4 justify-end mt-6">
                  <button type="button" onClick={fecharFormulario} className="px-6 py-3 rounded-full border-2 border-rosa-pastel text-rosa-text font-bold hover:bg-rosa-claro">
                    Cancelar
                  </button>
                  <button type="submit" className="px-6 py-3 bg-rosa-choque text-white rounded-full font-bold hover:bg-rosa-text transition-colors shadow-lg active:scale-95">
                    Salvar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnderecosPage;