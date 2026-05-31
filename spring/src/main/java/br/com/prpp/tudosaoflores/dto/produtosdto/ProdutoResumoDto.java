package br.com.prpp.tudosaoflores.dto.produtosdto;

import java.math.BigDecimal;

public record ProdutoResumoDto(
    Long codigo,
    String nome,
    Integer quantidade
) implements ProdutoDto {
    @Override public BigDecimal preco() { return null; }
    @Override public String categoria() { return null; }
    @Override public String descricao() { return null; }
    @Override public String imagem() { return null; }
}

