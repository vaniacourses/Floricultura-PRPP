package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
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
@DiscriminatorColumn(name = "tipo_produto", discriminatorType = DiscriminatorType.STRING) // Adicione isso
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Produto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private BigDecimal preco;


    private String nome;
    private String descricao;
    @Min(value = 0, message = "A quantidade não pode ser negativa")
    private Integer quantidade; // Quantidade em estoque
    private String imagem;

    public Produto(Long codigo, BigDecimal preco,String nome, String descricao, Integer quantidade, String imagem) {
        this.codigo = codigo;
        this.preco = preco;
        this.nome = nome;
        this.descricao = descricao;
        this.quantidade = quantidade;
        this.imagem = imagem;
    }
}
