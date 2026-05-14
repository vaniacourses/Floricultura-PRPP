package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Cupom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCupom;

    private BigDecimal desconto;
    private String nomeCupom;
    private String descricao;
    private Integer limiteDeUso;
    private LocalDate dataInicio;
    private LocalDate dataFim;

    public Cupom(Long idCupom, BigDecimal desconto, String nomeCupom, String descricao, Integer limiteDeUso, LocalDate dataInicio, LocalDate dataFim) {
        this.idCupom = idCupom;
        this.desconto = desconto;
        this.nomeCupom = nomeCupom;
        this.descricao = descricao;
        this.limiteDeUso = limiteDeUso;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
    }
}