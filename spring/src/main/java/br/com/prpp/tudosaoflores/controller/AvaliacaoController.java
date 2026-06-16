package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.AvaliacaoDto;
import br.com.prpp.tudosaoflores.dto.AvaliacaoCreate;
import br.com.prpp.tudosaoflores.service.AvaliacaoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/avaliacoes")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService avaliacaoService; 

 
    @GetMapping("/produto")
    public ResponseEntity<List<AvaliacaoDto>> recuperarAvaliacoesPorProduto(@RequestParam Long codigo){
        List<AvaliacaoDto> avaliacoesDto =  avaliacaoService.recuperarAvaliacoesPorProduto(codigo);
        return ResponseEntity.ok(avaliacoesDto);
    }


    @GetMapping("/usuario")
    public ResponseEntity<List<AvaliacaoDto>> recuperarAvaliacoesPorUsuario(@RequestParam Long usuarioId){
        List<AvaliacaoDto> avaliacoesDto =  avaliacaoService.recuperarAvaliacoesPorUsuario(usuarioId);
        return ResponseEntity.ok(avaliacoesDto);
    }

    @GetMapping("/{idAvaliacao}")
    public ResponseEntity<AvaliacaoDto> recuperarAvaliacaoPorId(@PathVariable Long idAvaliacao){
        AvaliacaoDto avaliacaoDto =  avaliacaoService.recuperarAvaliacaoPorId(idAvaliacao);
        return ResponseEntity.ok(avaliacaoDto);
    }

    @PostMapping
    public ResponseEntity<AvaliacaoDto> cadastrar(@RequestBody @Valid AvaliacaoCreate request) {
        AvaliacaoDto criado = avaliacaoService.cadastrarAvaliacao(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{idAvaliacao}")
    public ResponseEntity<AvaliacaoDto> alterar(@PathVariable Long idAvaliacao, @RequestBody @Valid AvaliacaoCreate request) {
        return ResponseEntity.ok(avaliacaoService.alterarAvaliacao(idAvaliacao, request));
    }

    @DeleteMapping("/{idAvaliacao}")
    public ResponseEntity<Void> remover(@PathVariable Long idAvaliacao) {
        avaliacaoService.removerAvaliacaoPorId(idAvaliacao);
        return ResponseEntity.noContent().build();
    }
}