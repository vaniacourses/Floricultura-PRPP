package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.dto.AvaliacaoDto;
import br.com.prpp.tudosaoflores.model.Avaliacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AvaliacaoRepository extends JpaRepository<Avaliacao, Long> {
}
