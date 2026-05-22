package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Assinatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssinaturaRepository extends JpaRepository<Assinatura, String> {
}
