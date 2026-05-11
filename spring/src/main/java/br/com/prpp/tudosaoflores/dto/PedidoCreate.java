package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.ItemPedido;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoCreate (
    Long idUsuario,
    List<ItemPedidoCreate> itens
) {
}
