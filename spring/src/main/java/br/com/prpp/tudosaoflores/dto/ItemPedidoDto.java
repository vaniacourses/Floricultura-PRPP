package br.com.prpp.tudosaoflores.dto;

import java.math.BigDecimal;

public record ItemPedidoDto (
        Long id,
        Long idUsuario,
        Long codigo,
        String nomeProduto,
        Integer quantidade,
        Integer estoqueAtual,
        BigDecimal valorUnitario,
        BigDecimal subtotal
){
}
