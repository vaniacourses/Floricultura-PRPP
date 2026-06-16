package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.EnderecoCreate;
import br.com.prpp.tudosaoflores.dto.EnderecoDto;
import br.com.prpp.tudosaoflores.mapper.EnderecoMapper;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.Endereco;
import br.com.prpp.tudosaoflores.repository.EnderecoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnderecoService {

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private EnderecoMapper enderecoMapper;

    @Autowired
    private ClienteService clienteService;

    public List<EnderecoDto> listarEnderecos() {
        Cliente cliente = clienteService.obterClienteAutenticado();
        List<Endereco> enderecos = enderecoRepository.findByClienteUsuarioId(cliente.getUsuarioId());
        return enderecos.stream().map(enderecoMapper::toDto).collect(Collectors.toList());
    }

    public EnderecoDto criarEndereco(EnderecoCreate create) {
        Cliente cliente = clienteService.obterClienteAutenticado();
        Endereco endereco = enderecoMapper.toEntity(create);
        endereco.setCliente(cliente);
        endereco = enderecoRepository.save(endereco);
        return enderecoMapper.toDto(endereco);
    }

    public EnderecoDto atualizarEndereco(Long id, EnderecoCreate create) {
        Endereco endereco = enderecoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));

        Cliente cliente = clienteService.obterClienteAutenticado();
        if (!endereco.getCliente().getUsuarioId().equals(cliente.getUsuarioId())) {
            throw new RuntimeException("Acesso negado");
        }
        enderecoMapper.updateEntity(create, endereco);
        enderecoRepository.save(endereco);
        return enderecoMapper.toDto(endereco);
    }

    public void deletarEndereco(Long id) {
        Endereco endereco = enderecoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Endereço não encontrado"));
        Cliente cliente = clienteService.obterClienteAutenticado();
        if (!endereco.getCliente().getUsuarioId().equals(cliente.getUsuarioId())) {
            throw new RuntimeException("Acesso negado");
        }
        enderecoRepository.delete(endereco);
    }
}