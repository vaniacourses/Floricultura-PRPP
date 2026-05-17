package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Carrinho;
import br.com.prpp.tudosaoflores.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CarrinhoRepository extends JpaRepository<Carrinho, Long> {
    @Query("SELECT c FROM Carrinho c JOIN FETCH c.itens WHERE c.cliente.usuarioId = :idUsuario")
    Optional<Carrinho> findByUsuarioUsuarioId(@Param("idUsuario") Long idUsuario);
}
