package br.com.prpp.tudosaoflores.mapper;
/*
import br.com.prpp.tudosaoflores.dto.PedidoCreate;
import br.com.prpp.tudosaoflores.dto.PedidoDto;
import br.com.prpp.tudosaoflores.model.ItemPedido;
import br.com.prpp.tudosaoflores.model.Pedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ItemPedidoMapper.class})
public interface PedidoMapper {

    List<PedidoDto> toPedidosDto(List<Pedido> pedidos);

    @Mapping(source = "usuario.nome", target = "nomeUsuario")
    @Mapping(source = "usuario.id", target = "idUsuario")
    PedidoDto toPedidoDto(Pedido pedido);

    @Mapping(target = "codigo", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "itens", ignore = true)
    Pedido toPedido (PedidoDto pedidoDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "itens", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "codigo", ignore = true)
    void updateToPedido(PedidoCreate pedidoCreate, @MappingTarget Pedido pedido);

    @Mapping(target = "codigo", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "itens", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    Pedido toPedido(PedidoCreate pedidoCreate);

}
*/