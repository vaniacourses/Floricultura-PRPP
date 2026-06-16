package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.ClienteCreate;
import br.com.prpp.tudosaoflores.dto.ClienteDto;
import br.com.prpp.tudosaoflores.mapper.ClienteMapper;
import br.com.prpp.tudosaoflores.model.Carrinho;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.PessoaFisica;
import br.com.prpp.tudosaoflores.model.PessoaJuridica;
import br.com.prpp.tudosaoflores.repository.CarrinhoRepository;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import br.com.prpp.tudosaoflores.repository.PedidoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import br.com.prpp.tudosaoflores.model.Pedido;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteMapper clienteMapper;

    @Autowired
    private CarrinhoRepository carrinhoRepository;


    @Autowired
    private PedidoRepository pedidoRepository;

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


    public ClienteDto cadastrarCliente(ClienteCreate request) {
        Cliente cliente;
        if ("PF".equalsIgnoreCase(request.getTipo())) {
            PessoaFisica pf = new PessoaFisica();
            pf.setNome(request.getNome());
            pf.setEmail(request.getEmail());
            pf.setTelefone(request.getTelefone());
            pf.setGoogleId(request.getGoogleId());
            pf.setCpf(request.getCpf());
            pf.setDataNascimento(request.getNascimento()); 
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


    public Cliente obterClienteAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !auth.isAuthenticated()) {
            throw new RuntimeException("Usuário não autenticado");
        }
        String email = auth.getName();
        return clienteRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
    }


    public ClienteDto obterPerfil() {
        Cliente cliente = obterClienteAutenticado();
        return clienteMapper.toDto(cliente);
    }


    public ClienteDto atualizarPerfil(ClienteCreate request) {
        Cliente cliente = obterClienteAutenticado();
        return alterarCliente(cliente.getUsuarioId(), request);
    }


    public void removerMinhaConta() {
        Cliente cliente = obterClienteAutenticado();

        Optional<Carrinho> carrinhoOpt = carrinhoRepository.findByUsuarioUsuarioId(cliente.getUsuarioId());
        carrinhoOpt.ifPresent(carrinho -> {
            carrinho.getItens().clear();
            carrinhoRepository.delete(carrinho);
        });

        List<Pedido> pedidos = pedidoRepository.findByUsuarioUsuarioId(cliente.getUsuarioId());
        for (Pedido pedido : pedidos) {
            pedido.setUsuario(null); 
            pedidoRepository.save(pedido);
        }

        clienteRepository.delete(cliente);
    }
}