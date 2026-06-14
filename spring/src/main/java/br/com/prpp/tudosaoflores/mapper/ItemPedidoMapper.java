package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.ItemPedidoDto;
import br.com.prpp.tudosaoflores.model.ItemPedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.math.BigDecimal;
import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemPedidoMapper {

    @Mapping(source = "produto.codigo", target = "codigo")
    @Mapping(source = "produto.nome", target = "nomeProduto")
    @Mapping(source = "produto.quantidade", target = "estoqueAtual")
    @Mapping(source = "pedido.usuario.usuarioId", target = "idUsuario")
    @Mapping(source = "precoUnitario", target = "valorUnitario")
    @Mapping(target = "subtotal", expression = "java(itemPedido.getPrecoUnitario().multiply(new BigDecimal(itemPedido.getQuantidade())))")
    ItemPedidoDto toItemPedidoDto(ItemPedido itemPedido);

    List<ItemPedidoDto> toDtos(List<ItemPedido> itens);
}
