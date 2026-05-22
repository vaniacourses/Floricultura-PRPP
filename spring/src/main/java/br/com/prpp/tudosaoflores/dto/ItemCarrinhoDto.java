package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.Carrinho;
import br.com.prpp.tudosaoflores.model.ItemCarrinho;
import br.com.prpp.tudosaoflores.model.Produto;

import java.math.BigDecimal;

public record ItemCarrinhoDto(
        Long id,
        Long produtoCodigo,
        BigDecimal precoUnitario,
        String produtoNome,
        String descricao,
        Integer quantidadePedida,
        String produtoImagem,
        BigDecimal subtotal
) {

    public ItemCarrinhoDto(ItemCarrinho item) {
        this(
                item.getId(),
                item.getProduto().getCodigo(),
                item.getProduto().getPreco(),
                item.getProduto().getNome(),
                item.getProduto().getDescricao(),
                item.getQuantidade(),
                item.getProduto().getImagem(),
                item.getProduto().getPreco().multiply(BigDecimal.valueOf(item.getQuantidade()))
        );
    }


}
