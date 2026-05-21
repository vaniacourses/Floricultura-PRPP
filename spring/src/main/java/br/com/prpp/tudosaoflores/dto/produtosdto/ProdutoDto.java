package br.com.prpp.tudosaoflores.dto.produtosdto;

import java.math.BigDecimal;
import java.util.Map;

public interface ProdutoDto {
    Long codigo();
    BigDecimal preco();
    String categoria();
    String nome();
    String descricao();
    Integer quantidade();
    String imagem();
}