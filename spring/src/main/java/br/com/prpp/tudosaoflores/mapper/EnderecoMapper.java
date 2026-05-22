package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.EnderecoCreate;
import br.com.prpp.tudosaoflores.dto.EnderecoDto;
import br.com.prpp.tudosaoflores.model.Endereco;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class EnderecoMapper {

    public EnderecoDto toDto(Endereco entity) {
        EnderecoDto dto = new EnderecoDto();
        dto.setId(entity.getId());
        dto.setCep(entity.getCep());
        dto.setRua(entity.getRua());
        dto.setNumero(entity.getNumero());
        dto.setBairro(entity.getBairro());
        dto.setCidade(entity.getCidade());
        dto.setUf(entity.getUf());
        dto.setComplemento(entity.getComplemento());
        return dto;
    }

    public List<EnderecoDto> toDtoList(List<Endereco> entities) {
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public Endereco toEntity(EnderecoCreate create) {
        Endereco entity = new Endereco();
        entity.setCep(create.getCep());
        entity.setRua(create.getRua());
        entity.setNumero(create.getNumero());
        entity.setBairro(create.getBairro());
        entity.setCidade(create.getCidade());
        entity.setUf(create.getUf());
        entity.setComplemento(create.getComplemento());
        // O cliente será definido no service
        return entity;
    }

    public void updateEntity(EnderecoCreate create, Endereco entity) {
        entity.setCep(create.getCep());
        entity.setRua(create.getRua());
        entity.setNumero(create.getNumero());
        entity.setBairro(create.getBairro());
        entity.setCidade(create.getCidade());
        entity.setUf(create.getUf());
        entity.setComplemento(create.getComplemento());
    }
}