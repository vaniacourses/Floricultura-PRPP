package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.produtosdto.ProdutoDto;
import br.com.prpp.tudosaoflores.dto.produtosdto.*;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;


import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring")
public interface ProdutoMapper {

    default ProdutoDto toProdutoDto(Produto produto) {
        if (produto == null) return null;

        if (produto instanceof Flor f) return toFlorDto(f);
        if (produto instanceof FlorSeca fs) return toFlorSecaDto(fs);
        if (produto instanceof Buque b) return toBuqueDto(b);
        if (produto instanceof Arranjo a) return toArranjoDto(a);
        if (produto instanceof Cartao c) return toCartaoDto(c);
        if (produto instanceof Kit k) return toKitDto(k);

        throw new IllegalArgumentException("Subclasse de produto não mapeada: " + produto.getClass());
    }

    default List<ProdutoDto> toProdutosDto(List<Produto> produtos) {
        if (produtos == null) return null;
        return produtos.stream().map(this::toProdutoDto).collect(Collectors.toList());
    }

    @Mapping(target = "categoria", expression = "java(\"FLORES\")")
    FlorDto toFlorDto(Flor flor);

    @Mapping(target = "categoria", expression = "java(\"FLORES_SECAS\")")
    FlorSecaDto toFlorSecaDto(FlorSeca florSeca);

    @Mapping(target = "categoria", expression = "java(\"BUQUES\")")
    BuqueDto toBuqueDto(Buque buque);

    @Mapping(target = "categoria", expression = "java(\"ARRANJOS\")")
    ArranjoDto toArranjoDto(Arranjo arranjo);

    @Mapping(target = "categoria", expression = "java(\"CARTOES\")")
    CartaoDto toCartaoDto(Cartao cartao);

    @Mapping(target = "categoria", expression = "java(\"KITS\")")
    KitDto toKitDto(Kit kit);
}