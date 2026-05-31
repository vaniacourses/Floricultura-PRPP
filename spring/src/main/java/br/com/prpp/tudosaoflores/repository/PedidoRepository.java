package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT p FROM Pedido p JOIN FETCH p.itens WHERE p.usuario.id = :idUsuario")
    List<Pedido> findByUsuarioUsuarioId(Long idUsuario);

    @Query("SELECT DISTINCT p FROM Pedido p " +"LEFT JOIN FETCH p.itens " + "LEFT JOIN FETCH p.usuario " + "WHERE p.data BETWEEN :inicio AND :fim")
    List<Pedido> findByDataBetweenCompleto(@Param("inicio") LocalDateTime inicio, @Param("fim") LocalDateTime fim);
  
    @Query("SELECT COALESCE(SUM(p.valorTotal), 0) FROM Pedido p " + "WHERE p.data BETWEEN :inicio AND :fim AND p.status IN :statusValidos")
    BigDecimal faturamentoDia(@Param("inicio") LocalDateTime inicio,@Param("fim") LocalDateTime fim,  @Param("statusValidos") List<String> statusValidos);
}
