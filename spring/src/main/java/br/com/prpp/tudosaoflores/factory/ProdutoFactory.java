package br.com.prpp.tudosaoflores.factory;

import br.com.prpp.tudosaoflores.model.Produto;

import java.util.Map;

public interface ProdutoFactory {
    Produto criar(Map<String, Object> dados);
    String getCategoria();
}
