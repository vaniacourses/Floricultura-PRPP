package br.com.prpp.tudosaoflores.dto;


import java.math.BigDecimal;
import java.time.LocalDate;

public record CupomCreate(
        BigDecimal desconto,
        String nomeCupom,
        String descricao,
        Integer limiteDeUso,
        LocalDate dataInicio,
        LocalDate dataFim
) {
}