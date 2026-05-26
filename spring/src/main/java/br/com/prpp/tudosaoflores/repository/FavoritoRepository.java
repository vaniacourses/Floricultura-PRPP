package br.com.prpp.tudosaoflores.repository;

import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface FavoritoRepository extends JpaRepository<Favorito, Long> {

    @Query("SELECT f.cliente FROM Favorito f WHERE f.produto.codigo = :produtoCodigo")
    List<Cliente> findClientesByProdutoCodigo(@Param("produtoCodigo") Long produtoCodigo);

    // Método auxiliar útil para o React checar se o usuário logado já favoritou o produto
    boolean existsByClienteUsuarioIdAndProdutoCodigo(Long clienteUsuarioId, Long produtoCodigo);

    // Método auxiliar útil para quando o usuário clicar no coração novamente para desfavoritar
    void deleteByClienteUsuarioIdAndProdutoCodigo(Long clienteUsuarioId, Long produtoCodigo);
}
