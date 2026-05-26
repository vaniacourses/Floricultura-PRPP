package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Favorito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idFavorito;

    @ManyToOne
    @JoinColumn(name = "usuario_id",  nullable = false )
    private Cliente cliente;

    @ManyToOne
    @JoinColumn(name = "codigo",   nullable = false )
    private Produto produto;
}
