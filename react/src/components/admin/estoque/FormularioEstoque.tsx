import React from "react";

const FormularioEstoque = ({
  formData,
  onChange,
  onSelectImagem,
  onSubmit,
  onCancelar,
  editandoCodigo,
  imagensPredefinidas
}) => {

  // Filtra as imagens predefinidas para mostrar apenas as da categoria selecionada
  const imagensDaCategoria = imagensPredefinidas?.filter(
    (img) => img.categoria === formData.categoria
  ) || [];

const renderCamposEspecificos = () => {
    switch (formData.categoria) {
      case "FLORES":
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Validade</label>
              <input type="date" name="validade" value={formData.validade} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Unidade de Medida</label>
              <select name="unidadeMedida" value={formData.unidadeMedida} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none">
                <option value="">Selecione...</option>
                <option value="UNITARIO">Unitário</option>
                <option value="DUZIA">Dúzia</option>
                <option value="MACO">Maço</option>
              </select>
            </div>
          </>
        );
      case "FLORES_SECAS":
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Validade</label>
              <input type="date" name="validade" value={formData.validade} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Unidade de Medida</label>
              <select name="unidadeMedida" value={formData.unidadeMedida} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none">
                <option value="">Selecione...</option>
                <option value="UNITARIO">Unitário</option>
                <option value="DUZIA">Dúzia</option>
                <option value="MACO">Maço</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-rosa-choque mb-1">Processo de Secagem</label>
              <select name="processoSecagem" value={formData.processoSecagem} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none">
                <option value="">Selecione...</option>
                <option value="NATURAL_PENDURADO">Natural Pendurado</option>
                <option value="SILICA_GEL">Sílica Gel</option>
                <option value="PRESERVADA_GLICERINA">Preservada Glicerina</option>
              </select>
            </div>
          </>
        );
      case "ARRANJOS":
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Validade</label>
              <input type="date" name="validade" value={formData.validade} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Vaso</label>
              <input type="text" name="vaso" placeholder="Vidro, Cerâmica..." value={formData.vaso} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
            </div>
          </>
        );
      case "BUQUES":
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Validade</label>
              <input type="date" name="validade" value={formData.validade} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Tamanho</label>
              <select name="tamanho" value={formData.tamanho} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none">
                <option value="">Selecione...</option>
                <option value="PEQUENO">Pequeno</option>
                <option value="MEDIO">Médio</option>
                <option value="GRANDE">Grande</option>
              </select>
            </div>
          </>
        );
      case "CARTOES":
        return (
          <>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Tema</label>
              <input type="text" name="tema" placeholder="Ex: Aniversário" value={formData.tema} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Dimensões</label>
              <input type="text" name="dimensoes" placeholder="Ex: 10x15cm" value={formData.dimensoes} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
            </div>
          </>
        );
      case "KITS":
        return (
          <div className="col-span-2">
            <label className="block text-sm font-bold text-rosa-choque mb-1">IDs dos Produtos (Separados por vírgula)</label>
            <input type="text" name="produtosIds" placeholder="Ex: 1, 4, 7" value={formData.produtosIds} onChange={onChange} className="w-full p-2 rounded-lg border border-rosa-pastel bg-white focus:ring-2 focus:ring-rosa-choque outline-none" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <section className="bg-white rounded-3xl shadow-xl border border-rosa-pastel p-6 mb-8">
      <h2 className="text-2xl font-bold tracking-tight mb-6">
        {editandoCodigo ? "Editar Produto" : "Cadastrar Novo Produto"}
      </h2>

      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Lado Esquerdo: Atributos Universais */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-rosa-choque mb-1">Nome do Produto *</label>
            <input type="text" name="nome" value={formData.nome} onChange={onChange} className="w-full p-3 rounded-xl border border-rosa-pastel bg-rosa-claro/20 focus:ring-2 focus:ring-rosa-choque outline-none" placeholder="Ex: Rosa Vermelha" required />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Preço (R$) *</label>
              <input type="number" name="preco" step="0.01" value={formData.preco} onChange={onChange} className="w-full p-3 rounded-xl border border-rosa-pastel bg-rosa-claro/20 focus:ring-2 focus:ring-rosa-choque outline-none" placeholder="0.00" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-rosa-choque mb-1">Quantidade *</label>
              <input type="number" name="quantidade" min="0" value={formData.quantidade} onChange={onChange} className="w-full p-3 rounded-xl border border-rosa-pastel bg-rosa-claro/20 focus:ring-2 focus:ring-rosa-choque outline-none" placeholder="10" required />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-rosa-choque mb-1">Categoria *</label>
            <select name="categoria" value={formData.categoria} onChange={onChange} className="w-full p-3 rounded-xl border border-rosa-pastel bg-rosa-claro/20 focus:ring-2 focus:ring-rosa-choque outline-none" required>
              <option value="FLORES">Flores</option>
              <option value="FLORES_SECAS">Flores Secas</option>
              <option value="ARRANJOS">Arranjos</option>
              <option value="BUQUES">Buquês</option>
              <option value="KITS">Kits</option>
              <option value="CARTOES">Cartões</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-rosa-choque mb-1">Descrição *</label>
            <textarea name="descricao" value={formData.descricao} onChange={onChange} rows="3" className="w-full p-3 rounded-xl border border-rosa-pastel bg-rosa-claro/20 focus:ring-2 focus:ring-rosa-choque outline-none" placeholder="Descreva o produto..." required></textarea>
          </div>
        </div>

        {/* Lado Direito: Atributos Específicos & Imagem */}
        <div className="space-y-4">
          
          {/* Caixa de campos dinâmicos da classe selecionada */}
          <div className="grid grid-cols-2 gap-4 mb-4 p-4 bg-rosa-claro/30 rounded-xl border border-rosa-pastel min-h-[100px]">
            {renderCamposEspecificos()}
          </div>

          {/* Galeria de Seleção de Imagens */}
          <div>
            <label className="block text-sm font-bold text-rosa-choque mb-2">
              Selecione a Imagem * <span className="text-gray-500 font-normal text-xs ml-2">
                (Mostrando imagens para: {formData.categoria})
              </span>
            </label>
            
            <div className="flex gap-4">
              {/* Pré-visualização da imagem selecionada */}
              <div className="w-32 h-32 rounded-xl overflow-hidden bg-rosa-claro border border-rosa-pastel flex-shrink-0 flex items-center justify-center">
                {formData.imagem ? (
                  <img src={formData.imagem} alt="Selecionada" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-xs text-rosa-text/50 text-center p-2">Nenhuma selecionada</span>
                )}
              </div>
              
              {/* Grid rolável de opções */}
              <div className="flex-1 bg-gray-50 p-2 rounded-xl border border-rosa-pastel h-32 overflow-y-auto">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {imagensDaCategoria.length > 0 ? (
                    imagensDaCategoria.map((img, idx) => (
                      <button
                        type="button"
                        key={idx}
                        onClick={() => onSelectImagem(img.url)}
                        title={img.nome}
                        className={`w-full aspect-square rounded-lg overflow-hidden transition-all border-2 ${
                          formData.imagem === img.url
                            ? "border-rosa-choque ring-2 ring-rosa-choque/50 scale-95" 
                            : "border-transparent hover:border-rosa-pastel hover:scale-105"
                        }`}
                      >
                        <img src={img.url} alt={img.nome} className="w-full h-full object-cover" />
                      </button>
                    ))
                  ) : (
                    <p className="text-xs italic text-gray-500 col-span-full text-center mt-4">
                      Nenhuma imagem predefinida encontrada para esta categoria.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-4 border-t border-rosa-pastel">
          {editandoCodigo && (
            <button type="button" onClick={onCancelar} className="px-6 py-3 rounded-xl font-bold text-rosa-text bg-rosa-claro hover:bg-rosa-pastel transition-all">
              Cancelar
            </button>
          )}
          <button type="submit" className="px-6 py-3 rounded-xl font-bold text-white bg-rosa-choque hover:bg-rosa-escuro transition-all">
            {editandoCodigo ? "Salvar Alterações" : "Adicionar Produto"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormularioEstoque;