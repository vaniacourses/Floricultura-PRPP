package br.com.prpp.tudosaoflores.mapper;


import br.com.prpp.tudosaoflores.dto.CupomCreate;
import br.com.prpp.tudosaoflores.dto.CupomDto;
import br.com.prpp.tudosaoflores.model.Cupom;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CupomMapper {

    List<CupomDto> toCuponsDto(List<Cupom> cupons);

    CupomDto toCupomDto(Cupom cupom);

    @Mapping(target = "idCupom", ignore = true)
    Cupom toCupom(CupomDto cupomDto);

    @Mapping(target = "idCupom", ignore = true)
    void updateToCupom(CupomCreate cupomCreate, @MappingTarget Cupom cupom);

    @Mapping(target = "idCupom", ignore = true)
    Cupom toCupom(CupomCreate cupomCreate);
}