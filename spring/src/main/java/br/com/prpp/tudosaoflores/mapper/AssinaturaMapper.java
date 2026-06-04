package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.AssinaturaCreate;
import br.com.prpp.tudosaoflores.dto.AssinaturaDto;
import br.com.prpp.tudosaoflores.model.Assinatura;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AssinaturaMapper {

    List<AssinaturaDto> toAssinaturasDto(List<Assinatura> assinaturas);

    @Mapping(source = "usuario.usuarioId", target = "idUsuario")
    AssinaturaDto toAssinaturaDto(Assinatura assinatura);

    @Mapping(target = "idAssinatura", ignore = true)
    @Mapping(target = "status", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "valorPlano", ignore = true)
    @Mapping(target = "dataContratacao", ignore = true)
    @Mapping(target = "idPedido", ignore = true)
    @Mapping(target = "historico", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    Assinatura toAssinatura(AssinaturaCreate assinaturaCreate);
}
