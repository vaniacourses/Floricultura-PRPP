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
public class Avaliacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idAvaliacao;

    private String texto;
    private LocalDate data;
    private String imagem;
    private Double nota;

    public Avaliacao(Long idAvaliacao, String texto, LocalDate data, String imagem, Double nota) {
        this.idAvaliacao = idAvaliacao;
        this.texto = texto;
        this.data = data;
        this.imagem = imagem;
        this.nota = nota;
    }
}