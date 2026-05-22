package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.CarrinhoDto;
import br.com.prpp.tudosaoflores.dto.ItemAtualizarQuantidade;
import br.com.prpp.tudosaoflores.dto.ItemCarrinhoCreate;
import br.com.prpp.tudosaoflores.model.Carrinho;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.service.CarrinhoService;
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


    @GetMapping
    public ResponseEntity<CarrinhoDto> recuperarCarrinho(@AuthenticationPrincipal Cliente clienteLogado)
    {
        Long clienteId = clienteLogado.getUsuarioId();
        CarrinhoDto carrinhoDto = carrinhoService.recuperarCarrinho(clienteId);
        return ResponseEntity.ok(carrinhoDto);
    }

    @PostMapping("/adicionar")
    public ResponseEntity<CarrinhoDto> adicionarItem(@AuthenticationPrincipal Cliente clienteLogado,
                                                     @RequestBody @Valid ItemCarrinhoCreate itemCarrinhoCreate)
    {
        CarrinhoDto carrinhoDto = carrinhoService.adicionarItemCarrinho(clienteLogado.getUsuarioId(), itemCarrinhoCreate);
        return ResponseEntity.status(HttpStatus.CREATED).body(carrinhoDto);
    }

    @PutMapping("/itens/{itemId}")
    public ResponseEntity<CarrinhoDto> atualizarItem(
            @AuthenticationPrincipal Cliente clienteLogado,
            @PathVariable Long itemId,
            @RequestBody @Valid ItemAtualizarQuantidade request)
    {
        CarrinhoDto carrinhoDto = carrinhoService.atualizarItem(clienteLogado.getUsuarioId(), itemId, request.novaQuantidade());
        return ResponseEntity.ok(carrinhoDto);
    }

    @DeleteMapping("/itens/{itemId}")
    public ResponseEntity<CarrinhoDto> excluirItem(
            @PathVariable Long itemId,
            @AuthenticationPrincipal Cliente clienteLogado)
    {
        CarrinhoDto carrinhoDto = carrinhoService.excluirItemPorId(itemId, clienteLogado.getUsuarioId());
        return ResponseEntity.ok(carrinhoDto);
    }

    @DeleteMapping
    public ResponseEntity<Void> esvaziarCarrinho(
            @AuthenticationPrincipal Cliente clienteLogado)
    {
        carrinhoService.esvaziarCarrinho(clienteLogado.getUsuarioId());
        return ResponseEntity.noContent().build();
    }

}
