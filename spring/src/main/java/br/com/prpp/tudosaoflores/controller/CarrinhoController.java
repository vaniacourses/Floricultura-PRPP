package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.CarrinhoDto;
import br.com.prpp.tudosaoflores.dto.ItemAtualizarQuantidade;
import br.com.prpp.tudosaoflores.dto.ItemCarrinhoCreate;
import br.com.prpp.tudosaoflores.model.Carrinho;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.service.CarrinhoService;
import br.com.prpp.tudosaoflores.service.ClienteService;
import br.com.prpp.tudosaoflores.service.ProdutoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/carrinho")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @Autowired
    private ProdutoService produtoService;

    @Autowired
    private ClienteService clienteService;


    @GetMapping
    public ResponseEntity<CarrinhoDto> recuperarCarrinho()
    {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        CarrinhoDto carrinhoDto = carrinhoService.recuperarCarrinho(clienteId);
        return ResponseEntity.ok(carrinhoDto);
    }

    @PostMapping("/adicionar")
    public ResponseEntity<CarrinhoDto> adicionarItem(@RequestBody @Valid ItemCarrinhoCreate itemCarrinhoCreate)
    {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        CarrinhoDto carrinhoDto = carrinhoService.adicionarItemCarrinho(clienteId, itemCarrinhoCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(carrinhoDto);
    }

    @PostMapping("/finalizar")
    public ResponseEntity<Void> finalizarCompra() {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        carrinhoService.finalizarCompra(clienteId);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/item/{itemId}")
    public ResponseEntity<CarrinhoDto> atualizarItem(
            @PathVariable Long itemId,
            @RequestParam Integer novaQuantidade)
    {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        CarrinhoDto carrinhoDto = carrinhoService.atualizarItem(clienteId, itemId, novaQuantidade);
        return ResponseEntity.ok(carrinhoDto);
    }

    @DeleteMapping("/item/{itemId}")
    public ResponseEntity<CarrinhoDto> excluirItem(@PathVariable Long itemId)
    {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        CarrinhoDto carrinhoDto = carrinhoService.excluirItemPorId(itemId, clienteId);
        return ResponseEntity.ok(carrinhoDto);
    }

    @DeleteMapping
    public ResponseEntity<Void> esvaziarCarrinho()
    {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        carrinhoService.esvaziarCarrinho(clienteId);
        return ResponseEntity.noContent().build();
    }

}
