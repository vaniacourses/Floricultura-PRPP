package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

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

    @ManyToOne
    @JoinColumn(name = "produtoId", nullable = false)
    private Produto produto;

    @ManyToOne
    @JoinColumn(name="usuarioId", nullable = false)
    private  Cliente usuario;

    public Avaliacao(Long idAvaliacao, String texto, LocalDate data, String imagem, Double nota,  Produto produto, Cliente usuario) {
        this.idAvaliacao = idAvaliacao;
        this.texto = texto;
        this.data = data;
        this.imagem = imagem;
        this.nota = nota;
        this.produto = produto;
        this.usuario = usuario;
    }
}