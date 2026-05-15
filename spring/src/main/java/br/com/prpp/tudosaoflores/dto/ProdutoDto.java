package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.Categoria;

import java.math.BigDecimal;

public record ProdutoDto(
        Long codigo,
        BigDecimal preco,
        Categoria categoria,
        String nome,
        String descricao,
        Integer quantidade,
        String imagem
) {
}
