import axios from "axios";
import { useEffect, useState } from "react";
import { IMAGENS_PREDEFINIDAS } from "../../../util/produtos";
import FormularioEstoque from "./FormularioEstoque";
import HeaderEstoque from "./HeaderEstoque";
import PesquisaEstoque from "./PesquisaEstoque";
import FiltroCategoria from "./FiltroCategoria";
import TabelaEstoque from "./TabelaEstoque";

const Estoque = () => {
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [produtos, setProdutos] = useState([]);
  const [formData, setFormData] = useState({
    nome: "",
    preco: "",
    categoria: "FLORES",
    descricao: "",
    quantidade: "",
    imagem: "",
    // Campos Específicos
    validade: "",
    unidadeMedida: "",
    processoSecagem: "",
    vaso: "",
    tamanho: "",
    tema: "",
    dimensoes: "",
    produtosIds: "", // Para a classe Kit
  });

  const [editandoCodigo, setEditandoCodigo] = useState(null);
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
      // Limpa os campos específicos ao trocar a categoria
      if (name === "categoria") {
        return {
          ...prevData,
          categoria: value,
          imagem: "",
          validade: "",
          unidadeMedida: "",
          processoSecagem: "",
          vaso: "",
          tamanho: "",
          tema: "",
          dimensoes: "",
          produtosIds: "",
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

    // Converte a lista de produtos do Kit para uma string de IDs separados por vírgula
    const idsDoKit = produto.produtos
      ? produto.produtos.map((p) => p.codigo).join(", ")
      : "";

    setFormData({
      nome: produto.nome || "",
      preco: produto.preco || "",
      categoria: produto.categoria || "FLORES",
      descricao: produto.descricao || "",
      quantidade: String(produto.quantidade || ""),
      imagem: produto.imagem || "",
      validade: produto.validade || "",
      unidadeMedida: produto.unidadeMedida || "",
      processoSecagem: produto.processoSecagem || "",
      vaso: produto.vaso || "",
      tamanho: produto.tamanho || "",
      tema: produto.tema || "",
      dimensoes: produto.dimensoes || "",
      produtosIds: idsDoKit,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const produtosFiltrados = produtos.filter((produto) => {
    const bateNome = produto.nome?.toLowerCase().includes(busca.toLowerCase());
    const bateCategoria =
      categoriaFiltro === "" || produto.categoria === categoriaFiltro;
    return bateNome && bateCategoria;
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.nome.trim() ||
      !formData.descricao.trim() ||
      !formData.preco ||
      !formData.quantidade ||
      !formData.imagem
    ) {
      alert(
        "Preencha todos os campos universais obrigatórios, incluindo a foto!",
      );
      return;
    }

    const mapearCategoriaParaRota = (cat) => {
      const mapeamento = {
        FLORES: "flores",
        FLORES_SECAS: "flores_secas",
        ARRANJOS: "arranjos",
        BUQUES: "buques",
        KITS: "kits",
        CARTOES: "cartoes",
      };
      return mapeamento[cat] || cat.toLowerCase();
    };

    const categoriaRota = mapearCategoriaParaRota(formData.categoria);

    // Remove campos de controle da submissão bruta
    const { categoria, produtosIds, ...dadosBrutos } = formData;

    // Remove os campos nulos ou vazios para não enviar atributos não reconhecidos pelo Spring
    const dadosEnvio = Object.fromEntries(
      Object.entries(dadosBrutos).filter(([_, v]) => v !== "" && v !== null),
    );

    // Tratamento para o relacionamento ManyToMany do Kit
    if (categoria === "KITS" && produtosIds) {
      dadosEnvio.produtos = produtosIds
        .split(",")
        .filter((id) => id.trim() !== "")
        .map((id) => ({ codigo: parseInt(id.trim()) }));
    }

    try {
      if (editandoCodigo) {
        await axios.put(
          `http://localhost:8080/produtos/${editandoCodigo}`,
          dadosEnvio,
        );
      } else {
        await axios.post(
          `http://localhost:8080/produtos/categoria/${categoriaRota}`,
          dadosEnvio,
        );
      }

      setFormData({
        nome: "",
        preco: "",
        categoria: "FLORES",
        descricao: "",
        quantidade: "",
        imagem: "",
        validade: "",
        unidadeMedida: "",
        processoSecagem: "",
        vaso: "",
        tamanho: "",
        tema: "",
        dimensoes: "",
        produtosIds: "",
      });
      setEditandoCodigo(null);
      carregarProdutos();
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto.");
    }
  };

  return (
    <div className="min-h-screen bg-rosa-claro p-4 md:p-8 font-menu text-rosa-text">
      <div className="max-w-6xl mx-auto">
        <HeaderEstoque />
        <FormularioEstoque
          formData={formData}
          onChange={handleChange}
          onSelectImagem={(url) => setFormData({ ...formData, imagem: url })}
          onSubmit={handleSubmit}
          onCancelar={() => {
            setEditandoCodigo(null);
            setFormData({
              nome: "",
              preco: "",
              categoria: "FLORES",
              descricao: "",
              quantidade: "",
              imagem: "",
              validade: "",
              unidadeMedida: "",
              processoSecagem: "",
              vaso: "",
              tamanho: "",
              tema: "",
              dimensoes: "",
              produtosIds: "",
            });
          }}
          editandoCodigo={editandoCodigo}
          imagensPredefinidas={IMAGENS_PREDEFINIDAS}
        />
        <PesquisaEstoque valor={busca} onBuscaChange={setBusca} />
        
        <FiltroCategoria
          categoriaAtiva={categoriaFiltro}
          onCategoriaChange={setCategoriaFiltro}
        />
        
        <TabelaEstoque
          produtos={produtosFiltrados}
          categoriaAtiva={categoriaFiltro}
          onEditar={prepararEdicao}
          onExcluir={excluirProduto}
        />
      </div>
    </div>
  );
};

export default Estoque;
