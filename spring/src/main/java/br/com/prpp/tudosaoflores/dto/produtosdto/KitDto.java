package br.com.prpp.tudosaoflores.dto.produtosdto;

import java.math.BigDecimal;
import java.util.List;

public record KitDto(Long codigo,
                     BigDecimal preco,
                     String categoria,
                     String nome,
                     String descricao,
                     Integer quantidade,
                     String imagem,
                     List<ProdutoDto> produtos) implements ProdutoDto{

}