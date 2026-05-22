package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.EnderecoCreate;
import br.com.prpp.tudosaoflores.dto.EnderecoDto;
import br.com.prpp.tudosaoflores.service.EnderecoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clientes/me/enderecos")
public class EnderecoController {

    @Autowired
    private EnderecoService enderecoService;

    @GetMapping
    public ResponseEntity<List<EnderecoDto>> listar() {
        return ResponseEntity.ok(enderecoService.listarEnderecos());
    }

    @PostMapping
    public ResponseEntity<EnderecoDto> criar(@RequestBody @Valid EnderecoCreate request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enderecoService.criarEndereco(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EnderecoDto> atualizar(@PathVariable Long id, @RequestBody @Valid EnderecoCreate request) {
        return ResponseEntity.ok(enderecoService.atualizarEndereco(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        enderecoService.deletarEndereco(id);
        return ResponseEntity.noContent().build();
    }
}