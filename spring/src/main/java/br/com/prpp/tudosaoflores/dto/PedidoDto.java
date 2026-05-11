package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.ItemPedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoDto (
        Long idPedido,
        LocalDateTime data,
        Usuario usuario,
        List<ItemPedido> itens,
        BigDecimal valorTotal,
        String status
){
}
