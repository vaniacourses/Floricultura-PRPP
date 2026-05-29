package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {
    int countByDataInicioBeforeAndDataFimAfter(LocalDate data1, LocalDate data2); 
    int countByDataInicioBetween(LocalDate inicio, LocalDate fim);
}
