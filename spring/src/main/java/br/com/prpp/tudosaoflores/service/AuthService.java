package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.GoogleAuthRequest;
import br.com.prpp.tudosaoflores.dto.AuthResponse;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.PessoaFisica;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import br.com.prpp.tudosaoflores.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Transactional
    public AuthResponse autenticarOuRegistrar(GoogleAuthRequest request) {
        Optional<Cliente> clienteOpt = clienteRepository.findByGoogleId(request.getUid());
        Cliente cliente;
        if (clienteOpt.isPresent()) {
            cliente = clienteOpt.get();
        } else {
            PessoaFisica pf = new PessoaFisica();
            pf.setNome(request.getNome());
            pf.setEmail(request.getEmail());
            pf.setTelefone("");
            pf.setGoogleId(request.getUid());
            pf.setCpf("");        
            pf.setDataNascimento(null);
            cliente = clienteRepository.save(pf);
        }
        String token = jwtUtil.generateToken(cliente.getEmail(), cliente.getUsuarioId());
        return new AuthResponse(token);
    }
}