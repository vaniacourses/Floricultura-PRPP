package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.Entity;
import jakarta.persistence.CascadeType;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OrderBy;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
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
    private LocalDate createdAt;
    
    

    @OneToMany(mappedBy = "assinatura", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    @OrderBy("dataTroca DESC")
    @ToString.Exclude
    private List<HistoricoAssinatura> historico = new ArrayList<>();

    // Gera o ID único na inicialização
    {
        this.idAssinatura = UUID.randomUUID().toString();
        this.createdAt = LocalDate.now();
    }

    public void consultarHistorico() {
        System.out.println("Consultando o histórico da assinatura: " + this.idAssinatura);
    }
}
