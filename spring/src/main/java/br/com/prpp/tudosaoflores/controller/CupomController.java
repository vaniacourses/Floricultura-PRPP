package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.CupomDto;
import br.com.prpp.tudosaoflores.dto.CupomCreate;
import br.com.prpp.tudosaoflores.service.CupomService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/cupons")
public class CupomController {

    @Autowired
    private CupomService cupomService;

    // GET - RECUPERAR

    @GetMapping
    public ResponseEntity<List<CupomDto>> recuperarCupons(){
        List<CupomDto> cuponsDto =  cupomService.recuperarCupons();
        return ResponseEntity.ok(cuponsDto);
    }

    @GetMapping("/{idCupom}")
    public ResponseEntity<CupomDto> recuperarCupomPorId(@PathVariable Long idCupom){
        CupomDto cupomDto =  cupomService.recuperarCupomPorId(idCupom);
        return ResponseEntity.ok(cupomDto);
    }

    @PostMapping
    public ResponseEntity<CupomDto> cadastrar(@RequestBody @Valid CupomCreate request) {
        CupomDto criado = cupomService.cadastrarCupom(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{idCupom}")
    public ResponseEntity<CupomDto> alterar(@PathVariable Long idCupom, @RequestBody @Valid CupomCreate request) {
        return ResponseEntity.ok(cupomService.alterarCupom(idCupom, request));
    }

    @DeleteMapping("/{idCupom}")
    public ResponseEntity<Void> remover(@PathVariable Long idCupom) {
        cupomService.removerCupomPorId(idCupom);
        return ResponseEntity.noContent().build();
    }
}

