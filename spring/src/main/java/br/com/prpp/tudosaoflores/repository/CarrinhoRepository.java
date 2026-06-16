package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Carrinho;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {

    @Query("SELECT c FROM Carrinho c LEFT JOIN FETCH c.itens WHERE c.cliente.usuarioId = :idUsuario")
    Optional<Carrinho> findByUsuarioUsuarioId(@Param("idUsuario") Long idUsuario);
}