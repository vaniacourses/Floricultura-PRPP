package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.produtosdto.ProdutoDto;
import br.com.prpp.tudosaoflores.service.ProdutoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
@CrossOrigin("*")
@RequiredArgsConstructor
public class ProdutoController {

    private final ProdutoService produtoService;


    @GetMapping
    public ResponseEntity<List<ProdutoDto>> recuperarProdutos() {
        List<ProdutoDto> produtos = produtoService.recuperarProdutos();
        return ResponseEntity.ok(produtos);
    }

  
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProdutoDto>> recuperarProdutosPorCategoria(@PathVariable String categoria) {
        List<ProdutoDto> produtos = produtoService.recuperarProdutosPorCategoria(categoria);
        return ResponseEntity.ok(produtos);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<ProdutoDto> recuperarProdutoPorCodigo(@PathVariable Long codigo) {
        ProdutoDto produto = produtoService.recuperarProdutoPorCodigo(codigo);
        return ResponseEntity.ok(produto);
    }


    @PostMapping("/categoria/{categoria}")
    public ResponseEntity<ProdutoDto> cadastrarProduto(
            @PathVariable String categoria,
            @RequestBody Map<String, Object> dados) {

        ProdutoDto novoProduto = produtoService.cadastrarProduto(categoria, dados);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }


    @PutMapping("/{codigo}")
    public ResponseEntity<ProdutoDto> alterarProduto(
            @PathVariable Long codigo,
            @RequestBody Map<String, Object> dados) {

        ProdutoDto produtoAtualizado = produtoService.alterarProduto(codigo, dados);
        return ResponseEntity.ok(produtoAtualizado);
    }


    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> removerProduto(@PathVariable Long codigo) {
        produtoService.removerProdutoPorCodigo(codigo);
        return ResponseEntity.noContent().build();
    }
}
