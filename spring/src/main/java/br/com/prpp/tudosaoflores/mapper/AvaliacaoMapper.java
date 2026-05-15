package br.com.prpp.tudosaoflores.mapper;


import br.com.prpp.tudosaoflores.dto.AvaliacaoCreate;
import br.com.prpp.tudosaoflores.dto.AvaliacaoDto;
import br.com.prpp.tudosaoflores.model.Avaliacao;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AvaliacaoMapper {

    List<AvaliacaoDto> toAvaliacoesDto(List<Avaliacao> avaliacoes);

    AvaliacaoDto toAvaliacaoDto(Avaliacao avaliacao);

    @Mapping(target = "idAvaliacao", ignore = true)
    Avaliacao toAvaliacao(AvaliacaoDto avaliacaoDto);

    @Mapping(target = "idAvaliacao", ignore = true)
    void updateToAvaliacao(AvaliacaoCreate avaliacaoCreate, @MappingTarget Avaliacao avaliacao);

    @Mapping(target = "idAvaliacao", ignore = true)
    Avaliacao toAvaliacao(AvaliacaoCreate avaliacaoCreate);
}