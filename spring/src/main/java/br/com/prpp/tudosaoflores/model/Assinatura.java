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

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Getter
@Setter
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
    private LocalDate createdAt;
    public Assinatura() {
        this.createdAt = LocalDate.now();
    }

    // Gera o ID único na inicialização
    {
        this.idAssinatura = UUID.randomUUID().toString();
    }

    public void consultarHistorico() {
        System.out.println("Consultando o histórico da assinatura: " + this.idAssinatura);
    }
}
