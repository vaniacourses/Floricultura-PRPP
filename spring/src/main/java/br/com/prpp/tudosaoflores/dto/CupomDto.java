package br.com.prpp.tudosaoflores.dto;

import org.springframework.cglib.core.Local;

import java.math.BigDecimal;
import java.time.LocalDate;

public record CupomDto(
        Long idCupom,
        BigDecimal desconto,
        String nomeCupom,
        String descricao,
        Integer limiteDeUso,
        LocalDate dataInicio,
        LocalDate dataFim
) {
}