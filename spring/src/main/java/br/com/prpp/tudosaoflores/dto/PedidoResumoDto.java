package br.com.prpp.tudosaoflores.dto;
import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonFormat;

public record PedidoResumoDto(
    Long id,
    String clienteNome,
    String status,
    BigDecimal valorTotal,

    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    LocalDateTime data
) {}