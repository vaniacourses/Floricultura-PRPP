package br.com.prpp.tudosaoflores.dto;
import java.util.List;

public record PedidoCreate (
    Long idUsuario,
    List<ItemPedidoCreate> itens
) {
}
