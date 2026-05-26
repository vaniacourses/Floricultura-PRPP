package br.com.prpp.tudosaoflores.observer;

import br.com.prpp.tudosaoflores.model.Produto;

public interface ProdutoPublisher {

    void addObserver(ProdutoObserver observer);
    void removeObserver(ProdutoObserver observer);
    void notifyObservers(Produto produto, String mensagem);
}
