package br.com.prpp.tudosaoflores.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import br.com.prpp.tudosaoflores.dto.AdministradorCreate;
import br.com.prpp.tudosaoflores.dto.AdministradorDTO;
import br.com.prpp.tudosaoflores.dto.GoogleAuthRequest;
import br.com.prpp.tudosaoflores.exception.AdminNaoEncontradoException;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.mapper.AdministradorMapper;
import br.com.prpp.tudosaoflores.model.Administrador;
import br.com.prpp.tudosaoflores.repository.AdministradorRespository;


@Service
public class AdministradorService {

    @Autowired
    private AdministradorRespository administradorRespository;
    @Autowired
    private AdministradorMapper administradorMapper;


    public AdministradorDTO cadastrarAdministrador(AdministradorCreate administradorCreate){
        Administrador admin = administradorMapper.toAdministrador(administradorCreate);
        //admin.setCreatedAt(LocalDate.now());
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
        recuperarAdministrador(id);
        administradorRespository.deleteById(id);
    }

    public AdministradorDTO autenticarComGoogle(GoogleAuthRequest request) {
    Administrador admin = administradorRespository.findByEmail(request.getEmail())
    .orElseThrow(() ->  new AdminNaoEncontradoException("Administrador não encontrado"));
    if (admin.getFirebaseUid() == null || admin.getFirebaseUid().isBlank()) {
        admin.setFirebaseUid(request.getUid());
        administradorRespository.save(admin);
    }
    return administradorMapper.toAdministradorDTO(admin);
} 
}
