import React, { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../services/api";
import { Loader2, ArrowLeft } from "lucide-react";

type ProdutoApi = {
    codigo: number;
    nome: string;
    preco: number;
    imagem: string;
};

const removeAcentos = (str: string) =>
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const termoOriginal = searchParams.get("q") || "";
    const termoBusca = removeAcentos(termoOriginal.toLowerCase());

    const [produtos, setProdutos] = useState<ProdutoApi[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const handleProdutoClick = (produto: ProdutoApi) => {
        navigate(`/detalhesPage/${produto.codigo}`);
    };

    useEffect(() => {
        if (!termoOriginal) {
        setLoading(false);
        return;
        }
        api
        .get<ProdutoApi[]>("/produtos")
        .then((response) => {
            const filtrados = response.filter((p) =>
            removeAcentos(p.nome.toLowerCase()).includes(termoBusca)
            );
            setProdutos(filtrados);
        })
        .catch((err) => console.error("Erro ao buscar produtos:", err))
        .finally(() => setLoading(false));
    }, [termoOriginal, termoBusca]);

    return (
        <div className="min-h-screen bg-rosa-claro font-menu text-rosa-text p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
            {/* Cabeçalho */}
            <div className="flex items-center gap-4 mb-10">
            <Link to="/" className="text-rosa-choque hover:opacity-80">
                <ArrowLeft size={28} />
            </Link>
            <h1 className="font-logo text-4xl md:text-5xl text-rosa-choque">
                resultados para “{termoOriginal}”
            </h1>
            </div>

            {/* Conteúdo */}
            {loading ? (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="animate-spin text-rosa-choque" size={48} />
            </div>
            ) : produtos.length === 0 ? (
            <div className="text-center py-20">
                <p className="text-lg text-rosa-text opacity-70">
                Nenhum produto encontrado para “{termoOriginal}”.
                </p>
                <Link
                to="/"
                className="mt-4 inline-block text-rosa-choque underline font-medium"
                >
                Voltar para a página inicial
                </Link>
            </div>
            ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {produtos.map((produto) => (
                <button
                    key={produto.codigo}
                    onClick={() => handleProdutoClick(produto)}
                    className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-rosa-pastel transition-all duration-300 hover:-translate-y-1 text-left w-full cursor-pointer"
                >
                    <div className="h-56 overflow-hidden">
                    <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    </div>
                    <div className="p-5">
                    <h3 className="font-bold text-rosa-text text-lg truncate group-hover:text-rosa-choque transition-colors">
                        {produto.nome}
                    </h3>
                    <p className="text-rosa-choque font-black text-xl mt-3">
                        R$ {produto.preco.toFixed(2)}
                    </p>
                    </div>
                </button>
                ))}
            </div>
            )}
        </div>
        </div>
    );
};

export default SearchPage;