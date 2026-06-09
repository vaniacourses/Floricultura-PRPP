package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.dto.AvaliacaoDto;
import br.com.prpp.tudosaoflores.model.Avaliacao;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.Cliente;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    @Query("SELECT a FROM Avaliacao a JOIN FETCH a.produto JOIN FETCH a.usuario WHERE a.produto.codigo = :codigo")
    List<Avaliacao> findByProduto_codigo(@Param("codigo") Long codigo);
    
    @Query("SELECT a FROM Avaliacao a JOIN FETCH a.produto JOIN FETCH a.usuario WHERE a.usuario.usuarioId = :usuarioId")
    List<Avaliacao> findByUsuario_usuarioId(@Param("usuarioId") Long usuarioId);
}
