package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.dto.AvaliacaoDto;
import br.com.prpp.tudosaoflores.model.Avaliacao;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
    List<Avaliacao> findByProduto_codigo(Long codigo);
    List<Avaliacao> findByUsuario_usuarioId(Long usuarioId);
}
