import axios from "axios";
import { useEffect, useState } from "react";
import { IMAGENS_PREDEFINIDAS } from "../../../util/produtos";
import TabelaDeProdutos from "./TabelaDeProdutos";
import FiltroEstoque from "./FiltroEstoque";
import FormularioProduto from "./FormularioEstoque";
import HeaderEstoque from "./HeaderEstoque";

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

    setFormData((prevData) => {
    if (name === "categoria") {
      return {
        ...prevData,
        categoria: value,
        imagem: "",
      };
    }
    
    return {
      ...prevData,
      [name]: value,
    };
  });
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
      
      <HeaderEstoque />

      <FormularioProduto
        formData={formData}
        onChange={handleChange}
        onSelectImagem={(url) => setFormData({ ...formData, imagem: url })}
        onSubmit={handleSubmit}
        onCancelar={() => {
          setEditandoCodigo(null);
          setFormData({ nome: "", preco: "", categoria: "FLORES", descricao: "", quantidade: "", imagem: "" });
        }}
        editandoCodigo={editandoCodigo}
        imagensPredefinidas={IMAGENS_PREDEFINIDAS}
      />

      <FiltroEstoque
        valor={busca} 
        onBuscaChange={setBusca} 
      />

      <TabelaDeProdutos 
        produtos={produtosFiltrados} 
        onEditar={prepararEdicao} 
        onExcluir={excluirProduto} 
      />

    </div>
  </div>
  );
};

export default Estoque;
