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

@CrossOrigin("*")
@RestController
@RequestMapping("/avaliacoes")
public class AvaliacaoController {

    @Autowired
    private AvaliacaoService AvaliacaoService;

    // GET - RECUPERAR

    @GetMapping
    public ResponseEntity<List<AvaliacaoDto>> recuperarAvaliacoes(){
        List<AvaliacaoDto> AvaliacoesDto =  AvaliacaoService.recuperarAvaliacoes();
        return ResponseEntity.ok(AvaliacoesDto);
    }

    @GetMapping("/{idAvaliacao}")
    public ResponseEntity<AvaliacaoDto> recuperarAvaliacaoPorId(@PathVariable Long idAvaliacao){
        AvaliacaoDto AvaliacaoDto =  AvaliacaoService.recuperarAvaliacaoPorId(idAvaliacao);
        return ResponseEntity.ok(AvaliacaoDto);
    }

    @PostMapping
    public ResponseEntity<AvaliacaoDto> cadastrar(@RequestBody @Valid AvaliacaoCreate request) {
        AvaliacaoDto criado = AvaliacaoService.cadastrarAvaliacao(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{idAvaliacao}")
    public ResponseEntity<AvaliacaoDto> alterar(@PathVariable Long idAvaliacao, @RequestBody @Valid AvaliacaoCreate request) {
        return ResponseEntity.ok(AvaliacaoService.alterarAvaliacao(idAvaliacao, request));
    }

    @DeleteMapping("/{idAvaliacao}")
    public ResponseEntity<Void> remover(@PathVariable Long idAvaliacao) {
        AvaliacaoService.removerAvaliacaoPorId(idAvaliacao);
        return ResponseEntity.noContent().build();
    }
}
