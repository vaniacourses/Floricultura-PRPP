package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Notificacao;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacaoRepository extends JpaRepository<Notificacao, Long> {

    List<Notificacao> findByClienteUsuarioIdOrderByDataEnvioDesc(Long clienteId);

    long countByClienteUsuarioIdAndLidaFalse(Long clienteId);

    List<Notificacao> findByClienteUsuarioIdAndLidaFalseOrderByDataEnvioDesc(Long clienteId);
}
