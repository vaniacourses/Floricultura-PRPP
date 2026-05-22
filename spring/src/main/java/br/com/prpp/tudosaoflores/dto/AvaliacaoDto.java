package br.com.prpp.tudosaoflores.dto;

import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;

public record AvaliacaoDto(
        Long idAvaliacao,
        String texto,
        LocalDate data,
        String imagem,
        Double nota,
        Long produtoId,
        Long usuarioId,
        String usuarioNome
) {
}