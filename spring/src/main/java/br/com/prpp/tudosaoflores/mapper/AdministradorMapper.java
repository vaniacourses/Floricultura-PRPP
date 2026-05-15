package br.com.prpp.tudosaoflores.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import br.com.prpp.tudosaoflores.dto.AdministradorCreate;
import br.com.prpp.tudosaoflores.dto.AdministradorDTO;
import br.com.prpp.tudosaoflores.model.Administrador;

@Mapper(componentModel = "spring")
public interface AdministradorMapper {
    
    AdministradorDTO toAdministradorDTO(Administrador admin);

    @Mapping(target = "usuarioId", ignore = true)
    Administrador toAdministrador(AdministradorCreate adminCreate);


    Administrador toAdministrador(AdministradorDTO adminDTO);

    List<AdministradorDTO> toAdministradoresDTO(List<Administrador> admin);
    
    @Mapping(target = "createdAt", ignore = true)
    void updateAdministrador(AdministradorCreate adminCreate, @MappingTarget Administrador administrador);
}
