package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT p FROM Pedido p JOIN FETCH p.itens WHERE p.usuario.id = :idUsuario")
    List<Pedido> findByUsuarioUsuarioId(Long idUsuario);

    @Query("SELECT DISTINCT p FROM Pedido p LEFT JOIN FETCH p.itens WHERE p.data BETWEEN :inicio AND :fim")
    List<Pedido> findByDataBetweenWithItens(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
}
