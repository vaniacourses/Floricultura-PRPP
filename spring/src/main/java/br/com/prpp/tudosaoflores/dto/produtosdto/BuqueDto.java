package br.com.prpp.tudosaoflores.dto.produtosdto;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BuqueDto(Long codigo,
                       BigDecimal preco,
                       String categoria, String nome,
                       String descricao,
                       Integer quantidade,
                       String imagem,
                       LocalDate validade,
                       String tamanho) implements ProdutoDto{

}
