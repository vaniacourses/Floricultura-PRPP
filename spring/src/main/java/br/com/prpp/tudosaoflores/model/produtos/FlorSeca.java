package br.com.prpp.tudosaoflores.model.produtos;

import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.enumprodutos.ProcessoSecagem;
import br.com.prpp.tudosaoflores.model.enumprodutos.UnidadeMedida;
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
@DiscriminatorValue("KITS")
public class FlorSeca extends Produto {

    private LocalDate validade;

    @Enumerated(EnumType.STRING)
    private UnidadeMedida unidadeMedida;

    @Enumerated(EnumType.STRING)
    private ProcessoSecagem processoSecagem;
}