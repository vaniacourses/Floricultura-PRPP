package br.com.prpp.tudosaoflores.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.prpp.tudosaoflores.model.Administrador;


public interface AdministradorRespository extends JpaRepository<Administrador, Long>{
    
}
