package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.ClienteDto;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.PessoaFisica;
import br.com.prpp.tudosaoflores.model.PessoaJuridica;
import org.springframework.stereotype.Component;

@Component
public class ClienteMapper {

    public ClienteDto toDto(Cliente cliente) {
        ClienteDto dto = new ClienteDto();
        dto.setId(cliente.getUsuarioId());
        dto.setNome(cliente.getNome());
        dto.setEmail(cliente.getEmail());
        dto.setTelefone(cliente.getTelefone());
        dto.setGoogleId(cliente.getGoogleId());

        if (cliente instanceof PessoaFisica pf) {
            dto.setTipo("PF");
            dto.setCpf(pf.getCpf());
            dto.setNascimento(pf.getDataNascimento());
        } else if (cliente instanceof PessoaJuridica pj) {
            dto.setTipo("PJ");
            dto.setRazaoSocial(pj.getRazaoSocial());
            dto.setCnpj(pj.getCnpj());
        }

        dto.setAtivo(true);
        dto.setMembroDesde("indisponível");
        return dto;
    }
}