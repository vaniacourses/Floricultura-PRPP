package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Assinatura {

    @Id
    private String idAssinatura;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id")
    @ToString.Exclude
    private Usuario usuario;

    private String tipoPlano;
    private String status;
    private BigDecimal valorPlano;
    private LocalDateTime dataContratacao;
    private Long idPedido;
    private String estiloArranjo;
    private String coresPreferidas;
    private String observacao;

    // Gera o ID único na inicialização
    {
        this.idAssinatura = UUID.randomUUID().toString();
    }

    public void consultarHistorico() {
        System.out.println("Consultando o histórico da assinatura: " + this.idAssinatura);
    }
}
