package br.com.prpp.tudosaoflores.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.prpp.tudosaoflores.model.Administrador;


public interface AdministradorRespository extends JpaRepository<Administrador, Long>{
    Optional<Administrador> findByEmail(String email);
}
