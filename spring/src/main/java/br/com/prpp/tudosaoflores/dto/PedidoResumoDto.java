package br.com.prpp.tudosaoflores.dto;

import java.math.BigDecimal;

public record PedidoResumoDto(Long id, String clienteNome, String status, BigDecimal valorTotal) {}
