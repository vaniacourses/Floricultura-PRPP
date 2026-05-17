import { useEffect, useState } from "react";
import axios from "axios";
import { Produto, Avaliacao } from "../data/types";
import ProdutoModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";


export default function BuquesPage() {
  const [selectedProduto, setSelectedProduto] = useState<Produto | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [Avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
  const [buques, setBuques] = useState<Produto[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const carregarBuques = async () => {
      try {
        const response = await axios.get<Produto[]>("http://localhost:8080/produtos/categoria/BUQUES");
        setBuques(response.data);
      } catch (error) {
        console.error("Erro ao carregar buquês:", error instanceof Error ? error.message : error);
      }
    };

    carregarBuques();
  }, []);

  useEffect(() => {
    
    const carregarAvaliacoes = async () => {
      try {
        const response = await axios.get<Avaliacao[]>("http://localhost:8080/avaliacoes");
        setAvaliacao(response.data);
      } catch (error) {
        console.error("Erro ao carregar avaliações:", error instanceof Error ? error.message : error);
      }
    };

    carregarAvaliacoes();
  }, []);

  const handleProdutoClick = (Produto: Produto) => {
    setSelectedProduto(Produto);
    setIsModalOpen(true);
  };

  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const handleAdicionarAoCarrinho = (Produto: Produto) => {
    
    const produtoExistente = carrinho.find((item) => item.codigo === Produto.codigo);

    if (produtoExistente) {
      const carrinhoAtualizado = carrinho.map((item) =>
        item.codigo === Produto.codigo ? { ...item, quantidade: (item.quantidade || 0)+ 1 } : item
      );
      setCarrinho(carrinhoAtualizado);
    } else {
      const novoProduto = { ...Produto, quantidade: 1 };
      setCarrinho([...carrinho, novoProduto]);
    }
    navigate("/carrinho");
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Nossos Buquês</h1>
          <p className="text-muted-foreground">
            Explore nossa coleção exclusiva de buquês frescos e elegantes
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {buques.map((Produto) => (
            <article
              key={Produto.codigo}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg cursor-pointer"
              onClick={() => handleProdutoClick(Produto)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={Produto.imagem}
                  alt={Produto.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3 p-4">
                <h2 className="text-lg font-semibold line-clamp-2">{Produto.nome}</h2>
                <p className="text-2xl font-bold text-primary">R$ {Produto.preco.toFixed(2)}</p>
                <button
                  type="button"
                  className="w-full rounded-full border border-slate-300 bg-rosa-choque text-white px-4 py-2 text-sm font-medium transition hover:bg-rosa-text transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAdicionarAoCarrinho(Produto);
                  }}
                >
                  Comprar
                </button>
                <button
                  type="button"
                  className="w-full rounded-full border border-slate-300 bg-transparent px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProdutoClick(Produto);
                  }}
                >
                  Ver Detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      <ProdutoModal
        Produto={selectedProduto}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        Avaliacoes={Avaliacao}
      />
    </div>
  );
}