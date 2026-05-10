package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.dto.ProdutoDto;
import br.com.prpp.tudosaoflores.model.Categoria;
import br.com.prpp.tudosaoflores.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {

    List<Produto> findByCategoria(Categoria categoria);
}
