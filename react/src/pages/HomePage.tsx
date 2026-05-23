import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Star, Truck, Gift, Clock, ShieldCheck, Phone,
  Camera, ThumbsUp, MessageCircle, Heart, ArrowRight, Sparkles,
} from "lucide-react";
import { api } from "../services/api";

type ProdutoApi = {
  codigo: number;
  nome: string;
  preco: number;
  imagem: string;
};

const HomePage = () => {
  const [destaques, setDestaques] = useState<ProdutoApi[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get<ProdutoApi[]>("/produtos")
      .then(response => {
        const aleatorios = response.sort(() => 0.5 - Math.random()).slice(0, 4);
        setDestaques(aleatorios);
      })
      .catch(err => console.error("Erro ao buscar produtos:", err));
  }, []);

  const handleProdutoClick = (produto: ProdutoApi) => {
    navigate(`/detalhesPage/${produto.codigo}`);
  };

  const depoimentos = [
    {
      nome: "Vânia de Oliveira",
      texto: "As flores mais lindas que já recebi! O buquê durou mais de duas semanas e o atendimento foi impecável. Super recomendo!",
      nota: 5,
    },
    {
      nome: "Leonardo Murta",
      texto: "Comprei um arranjo para o aniversário da minha esposa e ela amou. Entrega rápida e as flores vieram fresquinhas. Nota 10!",
      nota: 5,
    },
    {
      nome: "Pai da Madu",
      texto: "Sou cliente fiel há mais de um ano. As assinaturas são maravilhosas e o preço é justo. A curadoria das flores é incrível.",
      nota: 4.9,
    },
  ];

  const servicos = [
    {
      icone: <Truck size={28} />,
      titulo: "Entrega Expressa",
      descricao: "Entregamos em até 2 horas na região metropolitana. Cuidado especial com cada flor.",
    },
    {
      icone: <Gift size={28} />,
      titulo: "Presentes Personalizados",
      descricao: "Monte seu kit com chocolates, vinhos e cartões. Tornamos cada momento único.",
    },
    {
      icone: <Clock size={28} />,
      titulo: "Assinaturas Mensais",
      descricao: "Receba flores frescas toda semana. Planos flexíveis para você ou sua empresa.",
    },
    {
      icone: <ShieldCheck size={28} />,
      titulo: "Garantia de Qualidade",
      descricao: "Se as flores não durarem 7 dias, trocamos gratuitamente. Sua satisfação é nossa prioridade.",
    },
  ];

  return (
    <div className="min-h-screen bg-rosa-claro font-menu text-rosa-text">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-[#490829] via-[#B03A61] to-rosa-choque text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/assets/flor-login.jpg')" }}
        />
        <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-36 flex flex-col items-center text-center">
          <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-xs font-semibold tracking-widest mb-6">
            Tudo São Flores
          </span>
          <h1 className="font-logo text-5xl md:text-7xl leading-tight mb-6">
            bem-vindo a floricultura tudo são flores!
          </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mb-6">
            Buquês, arranjos e cestas artesanais entregues com cuidado e carinho.
            A melhor floricultura online do Brasil.
          </p>
          <p className="text-sm md:text-base opacity-80 mb-10">
            Quer falar com a gente?{" "}
            <Link to="/contato" className="underline hover:text-white transition-colors">
              Entre em contato
            </Link>{" "}
            ou chame no WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/flores"
              className="bg-white text-rosa-choque font-bold px-8 py-4 rounded-full hover:bg-rosa-claro transition-all shadow-xl hover:shadow-2xl active:scale-95"
            >
              Ver Catálogo
            </Link>
            <Link
              to="/assinaturas"
              className="border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
            >
              Assinar Agora
            </Link>
          </div>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-16 -mb-1"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="#FCE4EC"
            d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,74.7C1120,75,1280,53,1360,42.7L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"
          />
        </svg>
      </section>

      {/* SERVIÇOS / DIFERENCIAIS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-logo text-5xl md:text-6xl text-rosa-choque mb-4">
            por que escolher a gente?
          </h2>
          <p className="text-rosa-text opacity-70 max-w-xl mx-auto">
            Cada detalhe pensado para levar mais cor e alegria ao seu dia a dia.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicos.map((servico, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-lg border border-rosa-pastel hover:shadow-xl hover:scale-105 transition-all duration-300 text-center"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rosa-claro text-rosa-choque mb-6">
                {servico.icone}
              </div>
              <h3 className="text-xl font-bold text-rosa-text mb-3">{servico.titulo}</h3>
              <p className="text-sm text-rosa-text opacity-70 leading-relaxed">
                {servico.descricao}
              </p>
            </div>
          ))}
        </div>
      </section>

  
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
            <div>
              <h2 className="font-logo text-5xl md:text-6xl text-rosa-choque mb-3">
                queridinhos da semana
              </h2>
              <p className="text-rosa-text opacity-70">
                Os mais pedidos e amados pelos nossos clientes.
              </p>
            </div>
            <Link
              to="/flores"
              className="inline-flex items-center gap-2 text-rosa-choque font-bold hover:underline mt-4 md:mt-0"
            >
              Ver todos <ArrowRight size={18} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {destaques.map((produto) => (
              <button
                key={produto.codigo}
                onClick={() => handleProdutoClick(produto)}
                className="group bg-rosa-claro rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 text-left w-full cursor-pointer"
              >
                <div className="h-56 overflow-hidden">
                  <img
                    src={produto.imagem}
                    alt={produto.nome}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-rosa-text text-lg">
                    {produto.nome}
                  </h3>
                  <p className="text-rosa-choque font-black text-xl mt-2">
                    R$ {produto.preco.toFixed(2)}
                  </p>
                </div>
              </button>
            ))}
          </div>
          {destaques.length === 0 && (
            <p className="text-center text-rosa-text opacity-60">
              Nenhum produto em destaque no momento.
            </p>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="font-logo text-5xl md:text-6xl text-rosa-choque mb-4">
            o que estão dizendo
          </h2>
          <p className="text-rosa-text opacity-70 max-w-xl mx-auto">
            A opinião de quem já recebeu flores da Tudo São Flores.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {depoimentos.map((dep, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 shadow-lg border border-rosa-pastel flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={i < dep.nota ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-rosa-text opacity-80 italic flex-1 mb-6">“{dep.texto}”</p>
              <p className="font-bold text-rosa-choque text-sm">– {dep.nome}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-rosa-medio/30 to-rosa-claro py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block bg-rosa-choque/10 text-rosa-choque rounded-full px-4 py-1 text-xs font-semibold tracking-widest mb-4">
            Mais que flores
          </span>
          <h2 className="font-logo text-5xl md:text-6xl text-rosa-choque mb-6">
            serviços especiais
          </h2>
          <p className="text-rosa-text opacity-70 max-w-2xl mx-auto mb-16">
            Da decoração de eventos ao delivery de cestas, estamos prontos para
            tornar qualquer ocasião inesquecível.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-rosa-pastel hover:shadow-xl transition-all">
              <Sparkles size={32} className="text-rosa-choque mx-auto mb-4" />
              <h3 className="font-bold text-xl text-rosa-text mb-3">Decoração de Eventos</h3>
              <p className="text-sm text-rosa-text opacity-70">
                Casamentos, aniversários e confraternizações. Levamos a
                natureza para dentro da sua festa.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-rosa-pastel hover:shadow-xl transition-all">
              <Heart size={32} className="text-rosa-choque mx-auto mb-4" />
              <h3 className="font-bold text-xl text-rosa-text mb-3">Consultoria de Presentes</h3>
              <p className="text-sm text-rosa-text opacity-70">
                Não sabe o que escolher? Nossos especialistas montam a cesta
                perfeita para cada ocasião.
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 border border-rosa-pastel hover:shadow-xl transition-all sm:col-span-2 lg:col-span-1">
              <Phone size={32} className="text-rosa-choque mx-auto mb-4" />
              <h3 className="font-bold text-xl text-rosa-text mb-3">Atendimento VIP</h3>
              <p className="text-sm text-rosa-text opacity-70">
                Clientes corporativos têm desconto exclusivo e suporte
                dedicado para grandes pedidos.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;