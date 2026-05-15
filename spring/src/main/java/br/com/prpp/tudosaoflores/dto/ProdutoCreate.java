package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.Categoria;

import java.math.BigDecimal;

public record ProdutoCreate(
        BigDecimal preco,
        Categoria categoria,
        String nome,
        String descricao,
        Integer quantidade,
        String imagem
) {
}
