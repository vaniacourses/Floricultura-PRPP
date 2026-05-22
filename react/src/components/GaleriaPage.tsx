import { useEffect, useState } from "react";
import axios from "axios";
import type { Produto, Avaliacao } from "../data/types";
import { useNavigate } from "react-router-dom";


interface ProductGalleryProps {
  categoria: string;
  titulo: string;
  descricao: string;
}

export default function ProductGallery({ categoria, titulo, descricao }: ProductGalleryProps) {
  const navigate = useNavigate()
  const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
  const [produtos, setProdutos] = useState<Produto[]>([]);

  
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        const response = await axios.get<Produto[]>(`http://localhost:8080/produtos/categoria/${categoria}`);
        setProdutos(response.data);
      } catch (error) {
        console.error(`Erro ao carregar produtos da categoria ${categoria}:`, error instanceof Error ? error.message : error);
      }
    };

    carregarProdutos();
  }, [categoria]); 


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

 const handleProdutoClick = (produto: Produto) => {
  navigate(`/detalhesPage/${produto.codigo}`);
};

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{titulo}</h1>
          <p className="text-muted-foreground">{descricao}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <article
              key={produto.codigo}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg cursor-pointer"
              onClick={() => handleProdutoClick(produto)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="space-y-3 p-4">
                <h2 className="text-lg font-semibold line-clamp-2">{produto.nome}</h2>
                <p className="text-2xl font-bold text-primary">R$ {produto.preco.toFixed(2)}</p>
                <button
                  type="button"
                  className="w-full rounded-full border border-slate-300 bg-transparent px-4 py-2 text-sm font-medium transition hover:bg-slate-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProdutoClick(produto);
                  }}
                >
                  Ver Detalhes
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

    </div>
  );
}