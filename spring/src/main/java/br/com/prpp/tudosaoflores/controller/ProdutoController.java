package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.ProdutoDto;
import br.com.prpp.tudosaoflores.dto.ProdutoCreate;
import br.com.prpp.tudosaoflores.model.Categoria;
import br.com.prpp.tudosaoflores.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/produtos")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    // GET - RECUPERAR

    @GetMapping
    public ResponseEntity<List<ProdutoDto>> recuperarProdutos(){
        List<ProdutoDto> produtosDto =  produtoService.recuperarProdutos();
        return ResponseEntity.ok(produtosDto);
    }

    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProdutoDto>> recuperarProdutosPorCategoria(@PathVariable Categoria categoria){
        List<ProdutoDto> produtosDto = produtoService.recuperarProdutosPorCategoria(categoria);
        return ResponseEntity.ok(produtosDto);
    }

    @GetMapping("/{codigo}")
    public ResponseEntity<ProdutoDto> recuperarProdutoPorCodigo(@PathVariable Long codigo){
        ProdutoDto produtoDto =  produtoService.recuperarProdutoPorCodigo(codigo);
        return ResponseEntity.ok(produtoDto);
    }

    @PostMapping
    public ResponseEntity<ProdutoDto> cadastrar(@RequestBody @Valid ProdutoCreate request) {
        ProdutoDto criado = produtoService.cadastrarProduto(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{codigo}")
    public ResponseEntity<ProdutoDto> alterar(@PathVariable Long codigo, @RequestBody @Valid ProdutoCreate request) {
        return ResponseEntity.ok(produtoService.alterarProduto(codigo, request));
    }

    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> remover(@PathVariable Long codigo) {
        produtoService.removerProdutoPorCodigo(codigo);
        return ResponseEntity.noContent().build();
    }
}
