package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.dto.CupomDto;
import br.com.prpp.tudosaoflores.model.Cupom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CupomRepository extends JpaRepository<Cupom, Long> {
}
