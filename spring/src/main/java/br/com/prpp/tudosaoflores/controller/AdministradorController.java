package br.com.prpp.tudosaoflores.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.com.prpp.tudosaoflores.dto.AdministradorCreate;
import br.com.prpp.tudosaoflores.dto.AdministradorDTO;
import br.com.prpp.tudosaoflores.service.AdministradorService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/administrador")
@CrossOrigin(origins = "http://localhost:5173")
public class AdministradorController {
    
    @Autowired
    private AdministradorService administradorService;

    @PostMapping
    public ResponseEntity<AdministradorDTO> cadastrar(@RequestBody AdministradorCreate request) {
        return ResponseEntity.ok(administradorService.cadastrarAdministrador(request));
    }

    @GetMapping
    public ResponseEntity<List<AdministradorDTO>> listarTodos() {
        List<AdministradorDTO> adminsDTO = administradorService.listarTodos(); 
        return ResponseEntity.ok(adminsDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AdministradorDTO> recuperarAdministrador(@PathVariable Long id){
        AdministradorDTO adminDTO = administradorService.recuperarAdministrador(id);
        return ResponseEntity.ok(adminDTO);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdministradorDTO> atualizarAdministrador(@PathVariable Long id, @RequestBody @Valid AdministradorCreate adminUpdate){
        AdministradorDTO adminDTO = administradorService.atualizarAdministrador(id, adminUpdate);
        return ResponseEntity.ok(adminDTO);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<AdministradorDTO> deletarAdministrador(@PathVariable Long id){
        administradorService.deletarAdministrador(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/me")
        public ResponseEntity<AdministradorDTO> buscarPerfilAutenticado() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName(); 
        AdministradorDTO adminDTO = administradorService.recuperarAdministrador(email);
        return ResponseEntity.ok(adminDTO);
    }

    @PutMapping("/me")
    public ResponseEntity<AdministradorDTO> atualizarPerfilAutenticado(
            @RequestBody @Valid AdministradorCreate adminUpdate) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        
        AdministradorDTO adminExistente = administradorService.recuperarAdministrador(email);
        Long id = adminExistente.usuarioId();
        
        AdministradorDTO adminDTO = administradorService.atualizarAdministrador(id, adminUpdate);
        return ResponseEntity.ok(adminDTO);
    }


}