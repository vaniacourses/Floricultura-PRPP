package br.com.prpp.tudosaoflores.model.produtos;

import br.com.prpp.tudosaoflores.model.Produto;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "produto_codigo")
@DiscriminatorValue("CARTOES")
public class Cartao extends Produto {

    private String tema;
    private String dimensoes; // Ex: "10x15com"
}