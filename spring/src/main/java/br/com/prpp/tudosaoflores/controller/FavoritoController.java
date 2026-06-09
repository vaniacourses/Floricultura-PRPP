package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.Favorito;
import br.com.prpp.tudosaoflores.model.PessoaFisica;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.repository.FavoritoRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/favoritos")
@CrossOrigin("*")
public class FavoritoController {

    @Autowired
    private FavoritoRepository favoritoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/usuario/{usuarioId}/produto/{produtoCodigo}")
    public ResponseEntity<String> favoritarProduto(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoCodigo) {

        if (favoritoRepository.existsByClienteUsuarioIdAndProdutoCodigo(usuarioId, produtoCodigo)) {
            return ResponseEntity.badRequest().body("Este produto já está na sua lista de favoritos!");
        }

        Produto produto = produtoRepository.findById(produtoCodigo)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        Cliente cliente = clienteRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));

        Favorito favorito = new Favorito();
        favorito.setCliente(cliente);
        favorito.setProduto(produto);

        favoritoRepository.save(favorito);

        return ResponseEntity.ok("Produto adicionado aos favoritos com sucesso!");
    }


    @DeleteMapping("/usuario/{usuarioId}/produto/{produtoCodigo}")
    @Transactional
    public ResponseEntity<String> desfavoritarProduto(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoCodigo) {

        favoritoRepository.deleteByClienteUsuarioIdAndProdutoCodigo(usuarioId, produtoCodigo);
        return ResponseEntity.ok("Produto removido dos favoritos.");
    }

    @GetMapping("/usuario/{usuarioId}/produto/{produtoCodigo}/status")
    public ResponseEntity<Boolean> verificarSeEIdFavorito(
            @PathVariable Long usuarioId,
            @PathVariable Long produtoCodigo) {

        boolean isFavorito = favoritoRepository.existsByClienteUsuarioIdAndProdutoCodigo(usuarioId, produtoCodigo);
        return ResponseEntity.ok(isFavorito);
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Produto>> listarFavoritosDoUsuario(@PathVariable Long usuarioId) {
        List<Produto> produtosFavoritos = favoritoRepository.findProdutosByClienteUsuarioId(usuarioId);
        return ResponseEntity.ok(produtosFavoritos);
    }
}
