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

    // Atualização manual
    public ClienteDto alterarCliente(Long idCliente, ClienteCreate request) {
        Cliente cliente = clienteRepository.findById(idCliente)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        if (cliente instanceof PessoaFisica pf && "PF".equalsIgnoreCase(request.getTipo())) {
            pf.setNome(request.getNome());
            pf.setTelefone(request.getTelefone());
            pf.setCpf(request.getCpf());
            pf.setDataNascimento(request.getNascimento());
            // email e googleId geralmente não mudam
        } else if (cliente instanceof PessoaJuridica pj && "PJ".equalsIgnoreCase(request.getTipo())) {
            pj.setNome(request.getNome());
            pj.setTelefone(request.getTelefone());
            pj.setRazaoSocial(request.getRazaoSocial());
            pj.setCnpj(request.getCnpj());
        } else {
            throw new RuntimeException("Tipo de cliente não corresponde ou é inválido.");
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
}