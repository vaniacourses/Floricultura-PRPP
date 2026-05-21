package br.com.prpp.tudosaoflores.model.produtos;

import br.com.prpp.tudosaoflores.model.Produto;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@Entity
@PrimaryKeyJoinColumn(name = "produto_codigo")
public class Kit extends Produto {

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "kit_produtos",
            joinColumns = @JoinColumn(name = "kit_codigo"),
            inverseJoinColumns = @JoinColumn(name = "produto_codigo")
    )
    private List<Produto> produtos = new ArrayList<>();
}