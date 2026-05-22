package br.com.prpp.tudosaoflores.dto;

import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;

public record AvaliacaoCreate(
        String texto,
        LocalDate data,
        String imagem,
        Double nota,
        Long produtoId,
        Long usuarioId
) {
}