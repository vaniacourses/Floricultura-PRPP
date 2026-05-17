package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.CarrinhoDto;
import br.com.prpp.tudosaoflores.dto.CarrinhoDto;
import br.com.prpp.tudosaoflores.dto.ItemCarrinhoDto;
import br.com.prpp.tudosaoflores.model.Carrinho;
import br.com.prpp.tudosaoflores.model.ItemCarrinho;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.math.BigDecimal;
import java.util.List;

@Mapper(componentModel = "spring", uses = {ItemCarrinhoMapper.class})
public interface CarrinhoMapper {

    @Mapping(source = "cliente.usuarioId", target = "clienteId")
    @Mapping(source = "cliente.nome", target = "clienteNome")
    @Mapping(target = "valorTotal", expression = "java(calcularValorTotal(carrinho))")
    CarrinhoDto toCarrinhoDto(Carrinho carrinho);

    default BigDecimal calcularValorTotal(Carrinho carrinho) {
        if (carrinho == null || carrinho.getItens() == null) {
            return BigDecimal.ZERO;
        }
        return carrinho.getItens().stream()
                .map(item -> item.getProduto().getPreco().multiply(BigDecimal.valueOf(item.getQuantidade())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}