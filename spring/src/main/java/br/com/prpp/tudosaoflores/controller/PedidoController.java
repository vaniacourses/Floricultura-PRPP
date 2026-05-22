package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.PedidoCreate;
import br.com.prpp.tudosaoflores.dto.PedidoDto;
import br.com.prpp.tudosaoflores.service.ClienteService;
import br.com.prpp.tudosaoflores.service.PedidoService;
import br.com.prpp.tudosaoflores.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    PedidoService pedidoService;
    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public ResponseEntity<List<PedidoDto>> recuperarPedidos(){
        Long idUsuarioLogado = clienteService.obterClienteAutenticado().getUsuarioId();
        List<PedidoDto> pedidos = pedidoService.recuperarPedidos(idUsuarioLogado);
        return ResponseEntity.ok(pedidos);
    }

    @GetMapping("/{idPedido}")
    public ResponseEntity<PedidoDto> recuperarPedidoPorId(@PathVariable Long idPedido){
        PedidoDto pedido = pedidoService.recuperarPedidoPorId(idPedido);
        return ResponseEntity.ok(pedido);
    }

    @PostMapping
    public ResponseEntity<PedidoDto> cadastrarPedido(@RequestBody @Valid PedidoCreate request){
        PedidoDto criado = pedidoService.cadastrarPedido(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(criado);
    }

    @PutMapping("/{idPedido}")
    public ResponseEntity<PedidoDto> alterarPedido(@PathVariable Long idPedido, @RequestBody @Valid PedidoCreate request){
        return ResponseEntity.ok(pedidoService.alterarPedido(idPedido, request));
    }

    @DeleteMapping("/{idPedido}")
    public ResponseEntity<Void> removerPedido(@PathVariable Long idPedido){
        pedidoService.removerPedido(idPedido);
        return ResponseEntity.noContent().build();
    }
}
