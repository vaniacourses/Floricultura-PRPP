package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.ItemCarrinhoDto;
import br.com.prpp.tudosaoflores.model.ItemCarrinho;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemCarrinhoMapper {


    List<ItemCarrinhoDto> toItensCarrinhoDto(List<ItemCarrinho> itens);

    @Mapping(source = "produto.codigo", target = "produtoCodigo")
    @Mapping(source = "produto.nome", target = "produtoNome")
    @Mapping(source = "produto.imagem", target = "produtoImagem")
    @Mapping(source = "produto.preco", target = "precoUnitario")
    @Mapping(source = "quantidade", target = "quantidadePedida")
    @Mapping(target = "subtotal", expression = "java(item.getProduto().getPreco().multiply(BigDecimal.valueOf(item.getQuantidade())))")
    ItemCarrinhoDto toItemCarrinhoDto(ItemCarrinho item);
}