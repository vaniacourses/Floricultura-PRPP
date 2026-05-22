package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.ClienteCreate;
import br.com.prpp.tudosaoflores.dto.ClienteDto;
import br.com.prpp.tudosaoflores.service.ClienteService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<ClienteDto>> recuperarClientes() {
        return ResponseEntity.ok(clienteService.recuperarClientes());
    }

    @GetMapping("/me")
    public ResponseEntity<ClienteDto> perfil() {
        return ResponseEntity.ok(clienteService.obterPerfil());
    }

    @PutMapping("/me")
    public ResponseEntity<ClienteDto> alterarPerfil(@RequestBody @Valid ClienteCreate request) {
        return ResponseEntity.ok(clienteService.atualizarPerfil(request));
    }

    @GetMapping("/{idCliente}")
    public ResponseEntity<ClienteDto> recuperarClientePorId(@PathVariable Long idCliente) {
        return ResponseEntity.ok(clienteService.recuperarClientePorId(idCliente));
    }

    @GetMapping("/nome/{nome}")
    public ResponseEntity<List<ClienteDto>> recuperarClientesPorNome(@PathVariable String nome) {
        return ResponseEntity.ok(clienteService.recuperarClientesPorNome(nome));
    }

    @PostMapping
    public ResponseEntity<ClienteDto> cadastrar(@RequestBody @Valid ClienteCreate request) {
        ClienteDto criado = clienteService.cadastrarCliente(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{idCliente}")
    public ResponseEntity<ClienteDto> alterar(@PathVariable Long idCliente, @RequestBody @Valid ClienteCreate request) {
        return ResponseEntity.ok(clienteService.alterarCliente(idCliente, request));
    }

    @DeleteMapping("/{idCliente}")
    public ResponseEntity<Void> remover(@PathVariable Long idCliente) {
        clienteService.removerCliente(idCliente);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> excluirConta() {
        clienteService.removerMinhaConta();
        return ResponseEntity.noContent().build();
    }
}