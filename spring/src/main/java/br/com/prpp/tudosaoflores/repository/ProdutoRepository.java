package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto, Long> {


}
