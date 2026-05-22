package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    @Query("SELECT p FROM Produto p WHERE TYPE(p) = :categoria")
    List<Produto> findByCategoria(@Param("categoria") Class<? extends Produto> categoria);

    //List<Produto> findByCategoria(Categoria categoria);
}
