package br.com.prpp.tudosaoflores.model.produtos;

import br.com.prpp.tudosaoflores.model.Produto;
import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.PrimaryKeyJoinColumn;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "produto_codigo")
@DiscriminatorValue("ARRANJOS")
public class Arranjo extends Produto {

    private LocalDate validade;
    private String vaso; // Vidro, Cerâmica, Caixa...
}

