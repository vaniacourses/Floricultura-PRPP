package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Pedido;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {
    @Query("SELECT DISTINCT p FROM Pedido p LEFT JOIN FETCH p.itens WHERE p.usuario.usuarioId = :idUsuario ORDER BY p.data DESC")
    List<Pedido> findByUsuarioUsuarioId(Long idUsuario);
}
