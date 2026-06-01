package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Assinatura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface AssinaturaRepository extends JpaRepository<Assinatura, String> {
    Optional<Assinatura> findFirstByUsuarioUsuarioIdAndStatusIgnoreCaseAndDataContratacaoAfterOrderByDataContratacaoDesc(
            Long usuarioId,
            String status,
            LocalDateTime dataLimite
    );

    int countByStatus(String status);

    int countByCreatedAtBetween(LocalDate inicio, LocalDate fim);
}
