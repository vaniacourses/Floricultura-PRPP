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
@RequiredArgsConstructor // O Lombok também cria o construtor para injetar o ProdutoService aqui!
public class ProdutoController {

    private final ProdutoService produtoService;

    // GET - Listar todos os produtos do sistema (Retorna uma lista mista de FlorDto, KitDto, etc.)
    @GetMapping
    public ResponseEntity<List<ProdutoDto>> recuperarProdutos() {
        List<ProdutoDto> produtos = produtoService.recuperarProdutos();
        return ResponseEntity.ok(produtos);
    }

    // GET - Filtrar produtos por categoria (Ex: /produtos/categoria/flores ou /produtos/categoria/cartoes)
    @GetMapping("/categoria/{categoria}")
    public ResponseEntity<List<ProdutoDto>> recuperarProdutosPorCategoria(@PathVariable String categoria) {
        List<ProdutoDto> produtos = produtoService.recuperarProdutosPorCategoria(categoria);
        return ResponseEntity.ok(produtos);
    }

    // GET - Buscar um único produto detalhado pelo código
    @GetMapping("/{codigo}")
    public ResponseEntity<ProdutoDto> recuperarProdutoPorCodigo(@PathVariable Long codigo) {
        ProdutoDto produto = produtoService.recuperarProdutoPorCodigo(codigo);
        return ResponseEntity.ok(produto);
    }

    // POST - Cadastrar um novo produto dinamicamente baseado na categoria da URL
    @PostMapping("/categoria/{categoria}")
    public ResponseEntity<ProdutoDto> cadastrarProduto(
            @PathVariable String categoria,
            @RequestBody Map<String, Object> dados) {

        ProdutoDto novoProduto = produtoService.cadastrarProduto(categoria, dados);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoProduto);
    }

    // PUT - Atualizar dados de um produto existente de forma parcial/dinâmica
    @PutMapping("/{codigo}")
    public ResponseEntity<ProdutoDto> alterarProduto(
            @PathVariable Long codigo,
            @RequestBody Map<String, Object> dados) {

        ProdutoDto produtoAtualizado = produtoService.alterarProduto(codigo, dados);
        return ResponseEntity.ok(produtoAtualizado);
    }

    // DELETE - Remover um produto do sistema
    @DeleteMapping("/{codigo}")
    public ResponseEntity<Void> removerProduto(@PathVariable Long codigo) {
        produtoService.removerProdutoPorCodigo(codigo);
        return ResponseEntity.noContent().build();
    }
}
