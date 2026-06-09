package br.com.prpp.tudosaoflores.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

public record EntregaResumoDto(
        Long idPedido,
        String cliente,
        LocalDateTime dataPedido,
        BigDecimal valorTotal,
        String status
) {}