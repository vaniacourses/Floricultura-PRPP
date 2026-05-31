import axios from "axios";
import { useEffect, useState } from "react";

const Promocoes = () => {
  const [cupons, setCupons] = useState([]); //Guarda o que o usuário digita
  const [formData, setFormData] = useState({
    //vem do backend
        nomeCupom: "",
        desconto: "",
        limiteDeUso: "",
        dataFim: "",
        dataInicio: "",
        descricao: "",
      });

  
  const hoje = new Date().toISOString().split("T")[0];
  const [editandoCodigo, setEditandoCodigo] = useState(null); 

  const [busca, setBusca] = useState("");

  const carregarCupons = async () => {
    try {
      const response = await axios.get("http://localhost:8080/cupons");
      setCupons(response.data);
    } catch (error) {
      console.error("Erro ao buscar cupons:", error);
    }
  };

  useEffect(() => {
    carregarCupons();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const excluirCupom = async (idCupom) => {
    if (window.confirm("Tem certeza que deseja excluir este cupom?")) {
      try {
        await axios.delete(`http://localhost:8080/cupons/${idCupom}`);
        carregarCupons();
      } catch (error) {
        alert("Erro ao excluir cupom.");
      }
    }
  };

  const prepararEdicao = (cupom) => {
    setEditandoCodigo(cupom.idCupom);
    setFormData({
      nomeCupom: cupom.nomeCupom,
      desconto: cupom.desconto,
      limiteDeUso: cupom.limiteDeUso,
      dataInicio: cupom.dataInicio,
      dataFim: cupom.dataFim,
      descricao: cupom.descricao,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //
 const CuponsFiltrados = cupons.filter((cupom) =>
   cupom.nomeCupom?.toLowerCase().includes(busca.toLowerCase()),
 );
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nomeCupom.trim() ||
      !formData.descricao.trim() ||
      !formData.desconto ||
      !formData.limiteDeUso ||
      !formData.dataInicio ||
      !formData.dataFim
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    if (formData.dataInicio < hoje) {
    alert("A data de início não pode ser anterior ao dia de hoje!");
    return;
    }

    if (formData.dataFim <= formData.dataInicio) {
      alert("A data de término deve ser posterior à data de início!");
      return;
    }
    try {
      if (editandoCodigo) {
        await axios.put(
          `http://localhost:8080/cupons/${editandoCodigo}`,
          formData,
        );
      } else {
        await axios.post("http://localhost:8080/cupons", formData);
      }

      setFormData({
        nomeCupom: "",
        desconto: "",
        limiteDeUso: "",
        dataFim: "",
        dataInicio: "",
        descricao: "",
      });
      setEditandoCodigo(null);
      carregarCupons();
    } catch (error) {
      alert("Erro ao salvar cupom.");
    }
  };

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu text-rosa-text">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="font-logo text-7xl text-rosa-choque mb-2">
            tudo são flores
          </h1>
          <p className="uppercase tracking-widest text-sm opacity-80">
            Controle de cupons e promoções
          </p>
        </header>

        <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-rosa-pastel">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-rosa-choque rounded-full"></span>
            {editandoCodigo ? "Editar Cupom" : "Cadastrar Cupom"}
          </h2>

          <form
            //FORMULÁRIO
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1">Nome do cupom</label>
              <input
                name="nomeCupom"
                value={formData.nomeCupom}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
                placeholder="Ex: Promoção de Verão"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Desconto</label>
              <input
                name="desconto"
                type="number"
                step="0.01"
                value={formData.desconto}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
                placeholder="Ex: 0.20 (20% de desconto)"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Limite de uso</label>
              <input
                name="limiteDeUso"
                value={formData.limiteDeUso}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
                placeholder="Ex: 100"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Data de Início</label>
              <input
                name="dataInicio"
                value={formData.dataInicio}
                type="date"
                min = {hoje}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none bg-white transition-all"
                placeholder="Ex: 2026-06-01"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Data de Fim</label>
              <input
                name="dataFim"
                value={formData.dataFim}
                type="date"
                min = {formData.dataInicio}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none bg-white transition-all"
                placeholder="Ex: 2026-06-01"
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none min-h-[100px] transition-all"
                placeholder="Detalhes sobre o cupom e a campanha..."
              />
            </div>

            <div className="md:col-span-2 flex gap-4 mt-2">
              <button
                type="submit"
                className="bg-rosa-choque text-white px-8 py-3 rounded-full font-bold hover:bg-rosa-text transition-colors shadow-lg active:scale-95"
              >
                {editandoCodigo ? "Atualizar Cupom" : "Salvar Cupom"}
              </button>

              {(editandoCodigo) && (
                <button
                  type="button"
                  onClick={() => {
                    setEditandoCodigo(null);
                    setFormData({
                      nomeCupom: "",
                      desconto: "",
                      limiteDeUso: "",
                      dataFim: "",
                      dataInicio: "",
                      descricao: "",
                    });
                  }}
                  className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors"
                >
                  Limpar / Cancelar
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rosa-pastel">
          <div className="p-6 border-b border-rosa-pastel bg-rosa-pastel/20">
            <h2 className="text-2xl font-bold tracking-tight">Cupons Ativos</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-rosa-claro/50 text-rosa-choque uppercase text-xs font-black tracking-widest">
                  <th className="p-5">Nome do cupom</th>
                  <th className="p-5">Desconto</th>
                  <th className="p-5">Limite de Uso</th>
                  <th className="p-5">Data de Inicio</th>
                  <th className="p-5">Data de Fim</th>
                  <th className="p-5">Descrição</th>
                  <th className="p-5 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rosa-pastel/30">
                {CuponsFiltrados.map((cupom) => (
                  <tr
                    key={cupom.idCupom}
                    className="hover:bg-rosa-claro/30 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <span className="font-bold text-rosa-choque">
                          {cupom.nomeCupom}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-rosa-pastel text-rosa-choque text-xs font-bold rounded-full">
                        {Number(cupom.desconto) * 100}%
                      </span>
                    </td>
                    <td className="p-5">{cupom.limiteDeUso}</td>
                    <td className="p-5">
                      {cupom.dataInicio ? new Date(cupom.dataInicio).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-5">
                      {cupom.dataFim ? new Date(cupom.dataFim).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="p-5">{cupom.descricao}</td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => prepararEdicao(cupom)}
                          className="p-2 text-rosa-text hover:bg-rosa-medio hover:text-white rounded-lg transition-all"
                          title="Editar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => excluirCupom(cupom.idCupom)}
                          className="p-2 text-red-400 hover:bg-red-500 hover:text-white rounded-lg transition-all"
                          title="Excluir"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Promocoes;