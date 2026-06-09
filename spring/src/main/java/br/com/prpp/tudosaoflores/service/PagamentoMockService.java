package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.model.Pedido;
import org.springframework.stereotype.Service;

@Service
public class PagamentoMockService {

    private static final long TEMPO_PROCESSAMENTO_MS = 2000L;

    public void iniciarPagamento(Pedido pedido) {
        pedido.setStatus("AGUARDANDO_PAGAMENTO");
    }

    public void aprovarPagamento(Pedido pedido) {
        aguardarProcessamento();
        pedido.setStatus("PAGO");
    }

    private void aguardarProcessamento() {
        try {
            Thread.sleep(TEMPO_PROCESSAMENTO_MS);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new RuntimeException("Processamento de pagamento interrompido", e);
        }
    }
}
