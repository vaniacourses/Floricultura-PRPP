import axios from "axios";
import { useEffect, useState } from "react";
import { IMAGENS_PREDEFINIDAS } from "../../util/produtos";

const Estoque = () => {
  const [produtos, setProdutos] = useState([]); //Guarda o que o usuário digita
  const [formData, setFormData] = useState({
    //vem do backend
    nome: "",
    preco: "",
    categoria: "FLORES",
    descricao: "",
    quantidade: "",
    imagem: "",
  });

  const [editandoCodigo, setEditandoCodigo] = useState(null); //se tiver o id entende que está editando

  const [busca, setBusca] = useState("");

  const carregarProdutos = async () => {
    try {
      const response = await axios.get("http://localhost:8080/produtos");
      setProdutos(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const excluirProduto = async (codigo) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:8080/produtos/${codigo}`);
        carregarProdutos();
      } catch (error) {
        alert("Erro ao excluir produto.");
      }
    }
  };

  const prepararEdicao = (produto) => {
    setEditandoCodigo(produto.codigo);
    setFormData({
      nome: produto.nome,
      preco: produto.preco,
      categoria: produto.categoria,
      descricao: produto.descricao,
      quantidade: String(produto.quantidade),
      imagem: produto.imagem,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //
  const produtosFiltrados = produtos.filter((produto) =>
    produto.nome?.toLowerCase().includes(busca.toLowerCase()),
  );
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nome.trim() ||
      !formData.descricao.trim() ||
      !formData.preco ||
      !formData.quantidade ||
      !formData.imagem
    ) {
      alert("Preencha todos os campos, incluindo a foto!");
      return;
    }

    try {
      if (editandoCodigo) {
        await axios.put(
          `http://localhost:8080/produtos/${editandoCodigo}`,
          formData,
        );
      } else {
        await axios.post("http://localhost:8080/produtos", formData);
      }

      setFormData({
        nome: "",
        preco: "",
        categoria: "FLORES",
        descricao: "",
        quantidade: "",
        imagem: "",
      });
      setEditandoCodigo(null);
      carregarProdutos();
    } catch (error) {
      alert("Erro ao salvar produto.");
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
            Gerenciamento de Estoque
          </p>
        </header>

        <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-rosa-pastel">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-8 bg-rosa-choque rounded-full"></span>
            {editandoCodigo ? "Editar Produto" : "Novo Cadastro"}
          </h2>

          <form
            //FORMULÁRIO
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div className="flex flex-col">
              <label className="font-semibold mb-1">Nome do Produto</label>
              <input
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
                placeholder="Ex: Orquídea Phalaenopsis"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Preço (R$)</label>
              <input
                name="preco"
                type="number"
                step="0.01"
                value={formData.preco}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
                placeholder="0.00"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Quantidade</label>
              <input
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
                placeholder="Ex: 67"
              />
            </div>

            <div className="flex flex-col">
              <label className="font-semibold mb-1">Categoria</label>
              <select
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none bg-white transition-all"
              >
                <option value="FLORES">Flores</option>
                <option value="FLORES_SECAS">Flores Secas</option>
                <option value="ARRANJOS">Arranjos</option>
                <option value="BUQUES">Buquês</option>
                <option value="KITS">Kits</option>
                <option value="CARTOES">Cartões</option>
              </select>
            </div>

            {/* SELETOR DE IMAGENS */}
            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-3">
                Selecione a Foto do Produto:
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 p-4 border-2 border-rosa-pastel rounded-2xl bg-rosa-claro/20">
                {IMAGENS_PREDEFINIDAS.map((img) => (
                  <div
                    key={img.url}
                    onClick={() =>
                      setFormData({ ...formData, imagem: img.url })
                    }
                    className={`group cursor-pointer relative rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                      formData.imagem === img.url
                        ? "border-rosa-choque scale-105 shadow-lg"
                        : "border-transparent opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.nome}
                      className="w-full h-20 object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-rosa-choque/80 text-white text-[10px] text-center py-0.5 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                      {img.nome}
                    </div>
                  </div>
                ))}
              </div>
              {/* Campo oculto apenas para garantir o valor no form se necessário */}
              <input type="hidden" name="imagem" value={formData.imagem} />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="font-semibold mb-1">Descrição</label>
              <textarea
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none min-h-[100px] transition-all"
                placeholder="Detalhes sobre o produto..."
              />
            </div>

            <div className="md:col-span-2 flex gap-4 mt-2">
              <button
                type="submit"
                className="bg-rosa-choque text-white px-8 py-3 rounded-full font-bold hover:bg-rosa-text transition-colors shadow-lg active:scale-95"
              >
                {editandoCodigo ? "Atualizar Produto" : "Salvar Produto"}
              </button>

              {(editandoCodigo || formData.imagem) && (
                <button
                  type="button"
                  onClick={() => {
                    setEditandoCodigo(null);
                    setFormData({
                      nome: "",
                      preco: "",
                      categoria: "FLORES",
                      descricao: "",
                      quantidade: "",
                      imagem: "",
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

        {/* BARRA DE BUSCA */}
        <div className="mb-6 flex justify-end">
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="w-full p-3 pl-10 border-2 border-rosa-pastel rounded-full focus:border-rosa-medio outline-none transition-all bg-white"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-3.5 text-rosa-choque/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {/* TABELA DE PRODUTOS */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-rosa-pastel">
          <div className="p-6 border-b border-rosa-pastel bg-rosa-pastel/20">
            <h2 className="text-2xl font-bold tracking-tight">Estoque Atual</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-rosa-claro/50 text-rosa-choque uppercase text-xs font-black tracking-widest">
                  <th className="p-5">Produto</th>
                  <th className="p-5">Categoria</th>
                  <th className="p-5">Qtd</th>
                  <th className="p-5">Preço</th>
                  <th className="p-5 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rosa-pastel/30">
                {produtosFiltrados.map((produto) => (
                  <tr
                    key={produto.codigo}
                    className="hover:bg-rosa-claro/30 transition-colors group"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-rosa-claro flex-shrink-0 border border-rosa-pastel">
                          {produto.imagem ? (
                            <img
                              src={produto.imagem}
                              alt={produto.nome}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-rosa-choque/50">
                              N/A
                            </div>
                          )}
                        </div>
                        <span className="font-bold text-rosa-text">
                          {produto.nome}
                        </span>
                      </div>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 bg-rosa-pastel text-rosa-choque text-xs font-bold rounded-full">
                        {produto.categoria}
                      </span>
                    </td>
                    <td className="p-5 font-medium">{produto.quantidade}</td>
                    <td className="p-5 font-bold text-rosa-choque">
                      R$ {Number(produto.preco).toFixed(2)}
                    </td>
                    <td className="p-5">
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() => prepararEdicao(produto)}
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
                          onClick={() => excluirProduto(produto.codigo)}
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

export default Estoque;
