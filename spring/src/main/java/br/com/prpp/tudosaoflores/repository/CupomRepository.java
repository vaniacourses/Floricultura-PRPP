package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.Optional;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {
    int countByDataInicioLessThanEqualAndDataFimGreaterThanEqual(LocalDate inicio, LocalDate fim);
    int countByDataInicioBetween(LocalDate inicio, LocalDate fim);
    Optional<Cupom> findByNomeCupomIgnoreCase(String nomeCupom);
}
