package br.com.prpp.tudosaoflores.dto.produtosdto;

import java.math.BigDecimal;

public record CartaoDto(Long codigo,
                        BigDecimal preco,
                        String categoria,
                        String nome,
                        String descricao,
                        Integer quantidade,
                        String imagem,
                        String tema,
                        String dimensoes) implements ProdutoDto{

}
