package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.util.UUID;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Assinatura {

    @Id
    private String idAssinatura;

    private String tipoPlano;
    private String status;

    // Gera o ID único na inicialização
    {
        this.idAssinatura = UUID.randomUUID().toString();
    }

    public void consultarHistorico() {
        System.out.println("Consultando o histórico da assinatura: " + this.idAssinatura);
    }
}
