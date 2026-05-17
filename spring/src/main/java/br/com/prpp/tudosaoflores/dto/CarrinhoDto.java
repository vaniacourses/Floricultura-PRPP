package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.Carrinho;

import java.math.BigDecimal;
import java.util.List;

public record CarrinhoDto (
        Long id,
        Long clienteId,
        String clienteNome,
        List<ItemCarrinhoDto> itens,
        BigDecimal valorTotal)
{
    public CarrinhoDto(Carrinho carrinho){
        this(
                carrinho.getId(),
                carrinho.getCliente().getUsuarioId(),
                carrinho.getCliente().getNome(),
                carrinho.getItens().stream()
                    .map(ItemCarrinhoDto::new)
                    .toList(),
                carrinho.getItens().stream()
                    .map(item -> item.getProduto().getPreco().multiply(BigDecimal.valueOf(item.getQuantidade())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
        );

    }
}
