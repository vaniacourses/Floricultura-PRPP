package br.com.prpp.tudosaoflores.mapper;


import br.com.prpp.tudosaoflores.dto.ProdutoCreate;
import br.com.prpp.tudosaoflores.dto.ProdutoDto;
import br.com.prpp.tudosaoflores.model.Produto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    //Lista de Produtos -> Lista de Dto
    List<ProdutoDto> toProdutosDto(List<Produto> produtos);

    ProdutoDto toProdutoDto(Produto produto);

    //ProdutoDto -> Produto
    @Mapping(target = "codigo", ignore = true)
    Produto toProduto(ProdutoDto produtoDto);

    //ProdutoCreate -> Produto
    @Mapping(target = "codigo", ignore = true)
    //Produto toProduto(ProdutoCreate produtoCreate);
    void updateToProduto(ProdutoCreate produtoCreate, @MappingTarget Produto produto);

    @Mapping(target = "codigo", ignore = true)
    Produto toProduto(ProdutoCreate produtoCreate);
}
