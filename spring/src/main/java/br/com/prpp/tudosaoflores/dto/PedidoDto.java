package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.ItemPedido;
import br.com.prpp.tudosaoflores.model.Usuario;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoDto (
        Long idPedido,
        LocalDateTime data,
        Long idUsuario,
        List<ItemPedido> itens,
        BigDecimal valorTotal,
        String status
){
}
