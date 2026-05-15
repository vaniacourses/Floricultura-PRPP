package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {

    @Query("SELECT c FROM Cliente c WHERE LOWER(c.nome) LIKE LOWER(CONCAT('%', :nome, '%'))")
    List<Cliente> buscarPorNome(String nome);

    @Query("SELECT c FROM Cliente c WHERE c.googleId = :googleId")
    Optional<Cliente> findByGoogleId(String googleId);

    @Query("SELECT c FROM Cliente c WHERE c.email = :email")
    Optional<Cliente> findByEmail(String email);

}