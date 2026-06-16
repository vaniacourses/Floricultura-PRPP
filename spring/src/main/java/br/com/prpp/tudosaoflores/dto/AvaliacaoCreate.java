package br.com.prpp.tudosaoflores.dto;

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