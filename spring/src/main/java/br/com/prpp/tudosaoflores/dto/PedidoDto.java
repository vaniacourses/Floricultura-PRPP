package br.com.prpp.tudosaoflores.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record PedidoDto (
        Long idPedido,
        LocalDateTime data,
        Long idUsuario,
        List<ItemPedidoDto> itens,
        BigDecimal valorTotal,
        String status,
        String origem,
        String descricao,
        String nomeCupom,
        BigDecimal descontoCupom,
        Long idEnderecoEntrega,
        String enderecoEntrega,
        String idAssinatura,
        String estiloAssinatura,
        String coresAssinatura,
        String observacaoAssinatura,
        LocalDateTime dataReserva,
        String observacaoReserva,
        String tipoEvento,
        String localEvento,
        LocalDateTime dataEvento,
        String finalidadeReserva
){
}
