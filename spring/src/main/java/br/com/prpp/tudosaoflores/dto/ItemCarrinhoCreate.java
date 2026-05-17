package br.com.prpp.tudosaoflores.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ItemCarrinhoCreate (
        @NotNull
        Long produtoCodigo,

        @NotNull
        @Min(value = 1)
        Integer quantidade

){

}
