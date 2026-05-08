package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private BigDecimal preco;

    @Enumerated(EnumType.STRING)
    private Categoria categoria;

    private String nome;
    private String descricao;

    public Produto(Long codigo, BigDecimal preco, Categoria categoria, String nome, String descricao) {
        this.codigo = codigo;
        this.preco = preco;
        this.categoria = categoria;
        this.nome = nome;
        this.descricao = descricao;
    }
}
