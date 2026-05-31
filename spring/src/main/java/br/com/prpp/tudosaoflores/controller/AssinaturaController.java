package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.AssinaturaCreate;
import br.com.prpp.tudosaoflores.dto.AssinaturaDto;
import br.com.prpp.tudosaoflores.service.AssinaturaService;
import org.springframework.beans.factory.annotation.Autowired;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/assinaturas")
@CrossOrigin("*")
public class AssinaturaController {

    @Autowired
    private AssinaturaService service;

    @PostMapping
    public ResponseEntity<AssinaturaDto> contratar(@RequestBody @Valid AssinaturaCreate assinaturaCreate) {
        AssinaturaDto criado = service.contratarAssinatura(assinaturaCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PostMapping("/comprar")
    public ResponseEntity<AssinaturaDto> comprar(@RequestBody @Valid AssinaturaCreate assinaturaCreate) {
        AssinaturaDto criado = service.comprarAssinatura(assinaturaCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @GetMapping
    public ResponseEntity<List<AssinaturaDto>> recuperarAssinaturas() {
        return ResponseEntity.ok(service.recuperarAssinaturas());
    }

    @GetMapping("/minha")
    public ResponseEntity<AssinaturaDto> recuperarMinhaAssinaturaAtiva() {
        return service.recuperarMinhaAssinaturaAtiva()
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.noContent().build());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AssinaturaDto> recuperarAssinaturaPorId(@PathVariable String id) {
        return ResponseEntity.ok(service.recuperarAssinaturaPorId(id));
    }

    @PutMapping("/{id}/plano")
    public ResponseEntity<AssinaturaDto> atualizarPlano(@PathVariable String id, @RequestParam String novoPlano) {
        return ResponseEntity.ok(service.atualizarPlano(id, novoPlano));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> remover(@PathVariable String id) {
        service.cancelarAssinatura(id);
        return ResponseEntity.noContent().build();
    }
}
