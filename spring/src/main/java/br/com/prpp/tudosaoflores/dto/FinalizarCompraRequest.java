package br.com.prpp.tudosaoflores.dto;

public record FinalizarCompraRequest(
        String nomeCupom,
        Long idEndereco
) {
}
