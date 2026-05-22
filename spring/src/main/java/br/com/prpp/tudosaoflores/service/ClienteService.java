package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.ClienteCreate;
import br.com.prpp.tudosaoflores.dto.ClienteDto;
import br.com.prpp.tudosaoflores.mapper.ClienteMapper;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.PessoaFisica;
import br.com.prpp.tudosaoflores.model.PessoaJuridica;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteMapper clienteMapper;

    public List<ClienteDto> recuperarClientes() {
        List<Cliente> clientes = clienteRepository.findAll();
        return clientes.stream()
                .map(clienteMapper::toDto)
                .collect(Collectors.toList());
    }

    public ClienteDto recuperarClientePorId(Long idCliente) {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return clienteMapper.toDto(cliente);
    }

    public List<ClienteDto> recuperarClientesPorNome(String nome) {
        List<Cliente> clientes = clienteRepository.buscarPorNome(nome);
        return clientes.stream()
                .map(clienteMapper::toDto)
                .collect(Collectors.toList());
    }

    public ClienteDto recuperarClientePorGoogleId(String googleId) {
        Cliente cliente = clienteRepository.findByGoogleId(googleId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
        return clienteMapper.toDto(cliente);
    }

    // Cadastro manual, sem mappers específicos
    public ClienteDto cadastrarCliente(ClienteCreate request) {
        Cliente cliente;
        if ("PF".equalsIgnoreCase(request.getTipo())) {
            PessoaFisica pf = new PessoaFisica();
            pf.setNome(request.getNome());
            pf.setEmail(request.getEmail());
            pf.setTelefone(request.getTelefone());
            pf.setGoogleId(request.getGoogleId());
            pf.setCpf(request.getCpf());
            pf.setDataNascimento(request.getNascimento()); // ajuste se o campo for dataNascimento
            cliente = clienteRepository.save(pf);
        } else if ("PJ".equalsIgnoreCase(request.getTipo())) {
            PessoaJuridica pj = new PessoaJuridica();
            pj.setNome(request.getNome());
            pj.setEmail(request.getEmail());
            pj.setTelefone(request.getTelefone());
            pj.setGoogleId(request.getGoogleId());
            pj.setRazaoSocial(request.getRazaoSocial());
            pj.setCnpj(request.getCnpj());
            cliente = clienteRepository.save(pj);
        } else {
            throw new RuntimeException("Tipo de cliente inválido. Use 'PF' ou 'PJ'.");
        }
        return clienteMapper.toDto(cliente);
    }

    public ClienteDto alterarCliente(Long idCliente, ClienteCreate request) {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        cliente.setNome(request.getNome());
        cliente.setTelefone(request.getTelefone());

        if (cliente instanceof PessoaFisica pf) {
            if (request.getCpf() != null) pf.setCpf(request.getCpf());
            if (request.getNascimento() != null) pf.setDataNascimento(request.getNascimento());
        } else if (cliente instanceof PessoaJuridica pj) {
            if (request.getRazaoSocial() != null) pj.setRazaoSocial(request.getRazaoSocial());
            if (request.getCnpj() != null) pj.setCnpj(request.getCnpj());
        }

        clienteRepository.save(cliente);
        return clienteMapper.toDto(cliente);
    }

    public void removerCliente(Long idCliente) {
        if (!clienteRepository.existsById(idCliente)) {
            throw new RuntimeException("Cliente não encontrado para remoção");
        }
        clienteRepository.deleteById(idCliente);
    }

    // Obtém o cliente autenticado a partir do token JWT
    public Cliente obterClienteAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("Usuário não autenticado");
        }
        String email = auth.getName();
        return clienteRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }

    // Retorna o DTO do cliente logado
    public ClienteDto obterPerfil() {
        Cliente cliente = obterClienteAutenticado();
        return clienteMapper.toDto(cliente);
    }

    // Atualiza o perfil do cliente logado
    public ClienteDto atualizarPerfil(ClienteCreate request) {
        Cliente cliente = obterClienteAutenticado();
        return alterarCliente(cliente.getUsuarioId(), request);
    }

    public void removerMinhaConta() {
        Cliente cliente = obterClienteAutenticado();
        clienteRepository.delete(cliente);
    }
}