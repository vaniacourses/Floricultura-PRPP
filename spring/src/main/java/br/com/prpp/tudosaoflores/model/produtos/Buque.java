package br.com.prpp.tudosaoflores.model.produtos;


import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.enumprodutos.Tamanho;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "produto_codigo")
@DiscriminatorValue("BUQUES")
public class Buque extends Produto {

    private LocalDate validade;

    @Enumerated(EnumType.STRING)
    private Tamanho tamanho;
}
