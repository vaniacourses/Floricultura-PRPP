package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.ItemPedidoDto;
import br.com.prpp.tudosaoflores.model.ItemPedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ItemPedidoMapper {

    @Mapping(source = "produto.id", target = "idProduto")
    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "precoUnitario", target = "valorUnitario")
    @Mapping(source = "subtotal", target = "subtotal")
    ItemPedidoDto toItemPedidoDto(ItemPedido itemPedido);

    List<ItemPedidoDto> toDtos(List<ItemPedido> itens);
}
