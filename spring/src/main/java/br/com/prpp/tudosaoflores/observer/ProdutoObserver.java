package br.com.prpp.tudosaoflores.observer;

import br.com.prpp.tudosaoflores.model.Produto;

public interface ProdutoObserver{
    void update(Produto produto, String mensagem);
}
