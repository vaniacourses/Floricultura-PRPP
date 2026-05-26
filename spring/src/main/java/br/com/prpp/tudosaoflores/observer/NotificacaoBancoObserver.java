package br.com.prpp.tudosaoflores.observer;

import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.Notificacao;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.repository.FavoritoRepository;
import br.com.prpp.tudosaoflores.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import java.util.List;

@Component
public class NotificacaoBancoObserver implements ProdutoObserver {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @Override
    public void update(Produto produto, String mensagem) {

        List<Cliente> clientesInteressados = favoritoRepository.findClientesByProdutoCodigo(produto.getCodigo());


        for (Cliente cliente : clientesInteressados) {
            Notificacao notificacao = new Notificacao();
            notificacao.setCliente(cliente);
            notificacao.setMensagem(mensagem);

            notificacaoRepository.save(notificacao);
        }
    }
}