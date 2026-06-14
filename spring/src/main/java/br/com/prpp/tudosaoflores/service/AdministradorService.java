package br.com.prpp.tudosaoflores.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import br.com.prpp.tudosaoflores.dto.AdministradorCreate;
import br.com.prpp.tudosaoflores.dto.AdministradorDTO;
import br.com.prpp.tudosaoflores.dto.AuthResponse;
import br.com.prpp.tudosaoflores.dto.GoogleAuthRequest;
import br.com.prpp.tudosaoflores.exception.AdminNaoEncontradoException;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.mapper.AdministradorMapper;
import br.com.prpp.tudosaoflores.model.Administrador;
import br.com.prpp.tudosaoflores.repository.AdministradorRespository;
import br.com.prpp.tudosaoflores.security.JwtUtil;

@Service
public class AdministradorService {

    private static final Logger logger = LoggerFactory.getLogger(AdministradorService.class);

    @Autowired
    private AdministradorRespository administradorRespository;
    @Autowired
    private AdministradorMapper administradorMapper;
    @Autowired
    private JwtUtil jwtUtil;

    public AdministradorDTO cadastrarAdministrador(AdministradorCreate administradorCreate){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String role = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(r -> r.equals("ROLE_SUPER_ADMIN"))
                .findFirst()
                .orElse(null);
        if (role == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas SUPER_ADMIN pode criar administradores");
        }
        Administrador admin = administradorMapper.toAdministrador(administradorCreate);
        admin.setCreatedAt(LocalDate.now());
        administradorRespository.save(admin);
        return administradorMapper.toAdministradorDTO(admin);
    }

    public List<AdministradorDTO> listarTodos(){
        List<Administrador> admin = administradorRespository.findAll();
        return administradorMapper.toAdministradoresDTO(admin);
    }

    public AdministradorDTO recuperarAdministrador(Long id){
        Administrador admin = administradorRespository.findById(id).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Administrador com código " + id + " não encontrado")
        );
        return administradorMapper.toAdministradorDTO(admin);
    }

    public AdministradorDTO atualizarAdministrador(Long id, AdministradorCreate adminUpdate){
        Administrador admin = administradorRespository.findById(id).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Administrador com código " + id + " não encontrado")
        );
        administradorMapper.updateAdministrador(adminUpdate, admin);
        administradorRespository.save(admin);
        return administradorMapper.toAdministradorDTO(admin);
    }

    public void deletarAdministrador(Long id){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String role = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(r -> r.equals("ROLE_SUPER_ADMIN"))
                .findFirst()
                .orElse(null);
        if (role == null) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Apenas SUPER_ADMIN pode deletar administradores");
        }
        recuperarAdministrador(id);
        administradorRespository.deleteById(id);
    }

    public AuthResponse autenticarComGoogle(GoogleAuthRequest request) {
        String email = request.getEmail() == null ? "" : request.getEmail().trim().toLowerCase();
        Administrador admin = administradorRespository.findByEmail(email)
                .orElseThrow(() -> {
                    logger.warn("Login de administrador recusado: email Google '{}' não cadastrado", email);
                    return new AdminNaoEncontradoException("Administrador não encontrado");
                });

        if (admin.getFirebaseUid() == null || admin.getFirebaseUid().isBlank()) {
            admin.setFirebaseUid(request.getUid());
            administradorRespository.save(admin);
        }

        String role = admin.getNivelAcesso() != null ? admin.getNivelAcesso().name() : "GERENTE";
        String token = jwtUtil.generateToken(admin.getEmail(), admin.getUsuarioId(), role);
        return new AuthResponse(token);
    }

    public AdministradorDTO recuperarAdministrador(String email){
        Administrador admin = administradorRespository.findByEmail(email)
                .orElseThrow(() -> new AdminNaoEncontradoException("Administrador não encontrado"));
        return administradorMapper.toAdministradorDTO(admin);
    }
}
