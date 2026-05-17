package br.com.prpp.tudosaoflores.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ItemAtualizarQuantidade (
        @NotNull @Min(value = 1, message = "A quantidade deve ser pelo menos 1")
        Integer novaQuantidade
){
}
