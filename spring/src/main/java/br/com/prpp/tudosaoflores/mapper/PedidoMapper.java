package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.PedidoCreate;
import br.com.prpp.tudosaoflores.dto.PedidoDto;
import br.com.prpp.tudosaoflores.dto.PedidoResumoDto;
import br.com.prpp.tudosaoflores.model.Pedido;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring", uses = {ItemPedidoMapper.class})
public interface PedidoMapper {

    List<PedidoDto> toPedidosDto(List<Pedido> pedidos);


    @Mapping(source = "id", target = "idPedido")
    @Mapping(source = "usuario.usuarioId", target = "idUsuario")
    PedidoDto toPedidoDto(Pedido pedido);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "itens", ignore = true)
    Pedido toPedido (PedidoDto pedidoDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "itens", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "dataReserva", ignore = true)
    @Mapping(target = "observacaoReserva", ignore = true)
    @Mapping(target = "tipoEvento", ignore = true)
    @Mapping(target = "localEvento", ignore = true)
    @Mapping(target = "dataEvento", ignore = true)
    @Mapping(target = "finalidadeReserva", ignore = true)
    void updateToPedido(PedidoCreate pedidoCreate, @MappingTarget Pedido pedido);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "itens", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "dataReserva", ignore = true)
    @Mapping(target = "observacaoReserva", ignore = true)
    @Mapping(target = "tipoEvento", ignore = true)
    @Mapping(target = "localEvento", ignore = true)
    @Mapping(target = "dataEvento", ignore = true)
    @Mapping(target = "finalidadeReserva", ignore = true)
    Pedido toPedido(PedidoCreate pedidoCreate);

    @Mapping(source = "usuario.nome", target = "clienteNome")
    PedidoResumoDto toPedidoResumo(Pedido pedido);
    @Mapping(source = "usuario.nome", target = "clienteNome")
    List<PedidoResumoDto> toPedidosResumo(List<Pedido> pedidos);

}
