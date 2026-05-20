import React from "react";

const FormularioProduto = ({ 
  formData, 
  onChange, 
  onSelectImagem, 
  onSubmit, 
  onCancelar, 
  editandoCodigo, 
  imagensPredefinidas 
}) => {
  
  // Filtra as imagens baseado na categoria selecionada no select do formulário
  const imagensFiltradas = imagensPredefinidas.filter(
    (img) => img.categoria === formData.categoria
  );

  return (
    <section className="bg-white rounded-3xl shadow-xl p-6 md:p-10 mb-12 border border-rosa-pastel">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-rosa-choque rounded-full"></span>
        {editandoCodigo ? "Editar Produto" : "Novo Cadastro"}
      </h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col">
          <label className="font-semibold mb-1">Nome do Produto</label>
          <input
            name="nome"
            value={formData.nome}
            onChange={onChange}
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
            onChange={onChange}
            className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
            placeholder="0.00"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Quantidade</label>
          <input
            name="quantidade"
            value={formData.quantidade}
            onChange={onChange}
            className="p-3 border-2 border-rosa-pastel rounded-xl focus:border-rosa-medio outline-none transition-all"
            placeholder="Ex: 67"
          />
        </div>

        <div className="flex flex-col">
          <label className="font-semibold mb-1">Categoria</label>
          <select
            name="categoria"
            value={formData.categoria}
            onChange={onChange}
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

        {/* SELETOR DE IMAGENS FILTRADO */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-3">
            Selecione a Foto do Produto ({imagensFiltradas.length} disponíveis):
          </label>
          
          {imagensFiltradas.length > 0 ? (
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 p-4 border-2 border-rosa-pastel rounded-2xl bg-rosa-claro/20">
              {imagensFiltradas.map((img) => (
                <div
                  key={img.url}
                  onClick={() => onSelectImagem(img.url)}
                  className={`group cursor-pointer relative rounded-xl overflow-hidden border-4 transition-all duration-300 ${
                    formData.imagem === img.url
                      ? "border-rosa-choque scale-105 shadow-lg"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img.url} alt={img.nome} className="w-full h-20 object-cover" />
                  <div className="absolute bottom-0 w-full bg-rosa-choque/80 text-white text-[10px] text-center py-0.5 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    {img.nome}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center border-2 border-dashed border-rosa-pastel rounded-2xl text-sm opacity-60">
              Nenhuma foto predefinida cadastrada para esta categoria.
            </div>
          )}
          
          <input type="hidden" name="imagem" value={formData.imagem} />
        </div>

        <div className="flex flex-col md:col-span-2">
          <label className="font-semibold mb-1">Descrição</label>
          <textarea
            name="descricao"
            value={formData.descricao}
            onChange={onChange}
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
              onClick={onCancelar}
              className="bg-gray-200 text-gray-700 px-8 py-3 rounded-full font-bold hover:bg-gray-300 transition-colors"
            >
              Limpar / Cancelar
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default FormularioProduto;