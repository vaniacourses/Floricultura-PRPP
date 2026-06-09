package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.Favorito;
import br.com.prpp.tudosaoflores.model.Produto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

    @Query("SELECT f.cliente FROM Favorito f WHERE f.produto.codigo = :produtoCodigo")
    List<Cliente> findClientesByProdutoCodigo(@Param("produtoCodigo") Long produtoCodigo);

    @Query("SELECT f.produto FROM Favorito f WHERE f.cliente.usuarioId = :usuarioId")
    List<Produto> findProdutosByClienteUsuarioId(@Param("usuarioId") Long usuarioId);

    
    boolean existsByClienteUsuarioIdAndProdutoCodigo(Long clienteUsuarioId, Long produtoCodigo);


    void deleteByClienteUsuarioIdAndProdutoCodigo(Long clienteUsuarioId, Long produtoCodigo);
}
