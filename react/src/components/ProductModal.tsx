import { useEffect, useState, type FormEvent } from "react";
import type { Produto, Avaliacao } from "../data/types";
import axios from "axios";

type ProdutoModalProps = {
  Produto: Produto | null;
  isOpen: boolean;
  onClose: () => void;
  Avaliacoes: Avaliacao[];
};

export default function ProdutoModal({
  Produto,
  isOpen,
  onClose,
  Avaliacoes,
}: ProdutoModalProps) {
    const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]); 
    const [formData, setFormData] = useState({
            texto: "",
            data: new Date().toISOString().split("T")[0],
            imagem: "/assets/comentario.jpg",
            nota: "",
        });

     const [editandoCodigo, setEditandoCodigo] = useState<number | null>(null);

    const carregarAvaliacoes = async () => {
        try {
            const response = await axios.get("http://localhost:8080/avaliacoes");
            setAvaliacoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar avaliações:", error instanceof Error ? error.message : error);
        }
    };

    useEffect(() => {
        carregarAvaliacoes();
    }, []);

     const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
       e.preventDefault();

       if (
        !formData.texto.trim() ||
        !formData.nota.trim()
    ) {
      alert("Preencha todos os campos!");
      return;
    }

    const payload = {
    texto: formData.texto,
    data: new Date().toISOString().split("T")[0], 
    nota: parseFloat(formData.nota),
  };

    try {
      if (editandoCodigo) {
        await axios.put(
          `http://localhost:8080/avaliacoes/${editandoCodigo}`,
          payload,
        );
      } else {
        await axios.post("http://localhost:8080/avaliacoes", payload);
      }

      setFormData({
        texto: "",
        data: new Date().toISOString().split("T")[0],
        imagem: "/assets/comentario.jpg",
        nota: "",
      });
      setEditandoCodigo(null);
      carregarAvaliacoes();
      alert("Avaliação enviada com sucesso!");
    } catch (error) {
        console.error("ERRO DO BACKEND:", error);
        if (axios.isAxiosError(error)) {
          console.error("Detalhes do erro:", error.response?.data);
          alert(`Erro ao salvar avaliação: ${error.response?.data?.message || error.message}`);
        } else {
          alert("Erro desconhecido ao salvar avaliação.");
        }
    }
  };

  if (!isOpen || !Produto) {
        return null;
    }


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-semibold">{Produto.nome}</h2>
            <p className="text-sm text-muted-foreground">R$ {Produto.preco.toFixed(2)}</p>
          </div>
          <button
            type="button"
            className="rounded-full border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
            onClick={onClose}
          >
            Fechar
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <img
            src={Produto.imagem}
            alt={Produto.nome}
            className="h-64 w-full rounded-2xl object-cover"
          />

          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-2">Descrição</h3>
            <p>{Produto.descricao}</p>
            <div>
              <h3 className="text-lg font-semibold mb-2">Comentários</h3>
              <div className="space-y-3 max-h-56 overflow-y-auto rounded-xl border border-slate-200 p-3">
                {avaliacoes.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Nenhum comentário ainda.</p>
                ) : (
                  avaliacoes.map((avaliacao) => (
                    <div key={avaliacao.idAvaliacao} className="space-y-1 rounded-lg bg-slate-50 p-3">
                      <div className="flex items-center justify-between text-sm font-medium text-slate-900">
                        <span>Colocar atributo nome</span>
                        <span className="text-xs text-muted-foreground">{avaliacao.data}</span>
                      </div>
                      <p className="text-sm text-slate-700">{avaliacao.texto}</p>
                      <p className="text-xs text-slate-500">Nota: {avaliacao.nota}/5</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

    <br/>
    <br/>

     <section className="bg-white rounded-3xl shadow-xl p-4 md:p-6  border border-rosa-pastel">
        <div>
            
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-6 bg-rosa-choque rounded-full"></span>
             Deixe seu comentário 
          </h2>
        </div>


        <form className="grid grid-cols-2 md:grid-cols-5 gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-4 ls:grid-cols-1 col-span-4">
            <label  className="text-sm font-medium">Texto</label>
              <textarea
                name="texto"
                value={formData.texto}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-2 py-1 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
          </div>

          <div className="grid gap-4 sm:grid-cols-1 col-span-1">
            <label  className="text-sm font-medium">Nota</label>
              <select
                name="nota"
                value={formData.nota}
                onChange={handleChange}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
          </div>

            <div className="md:col-span-5 flex justify-center gap-4 mt-2">
            <button
              type="submit"
              className="rounded-full border border-slate-200 bg-rosa-choque px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
            >
              Enviar comentário
            </button>
            <button
              type="button"
              className="rounded-full border border-slate-200 bg-rosa-choque px-4 py-2 text-sm font-medium transition hover:bg-slate-200"
              onClick={onClose}
            >
              Cancelar
            </button>

          </div>
          
        </form>
        </section>
      </div>
    </div>
  );
}
