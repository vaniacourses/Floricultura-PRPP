package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.CarrinhoDto;
import br.com.prpp.tudosaoflores.dto.ItemAtualizarQuantidade;
import br.com.prpp.tudosaoflores.dto.ItemCarrinhoCreate;
import br.com.prpp.tudosaoflores.mapper.CarrinhoMapper;
import br.com.prpp.tudosaoflores.model.Carrinho;
import br.com.prpp.tudosaoflores.model.Cliente;
import br.com.prpp.tudosaoflores.model.ItemCarrinho;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.repository.CarrinhoRepository;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;


@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private CarrinhoMapper carrinhoMapper;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;


    public CarrinhoDto recuperarCarrinho(Long clienteId)
    {
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
        return carrinhoMapper.toCarrinhoDto(carrinho);
    };

    @Transactional
    public CarrinhoDto adicionarItemCarrinho(Long idUsuarioLogado, ItemCarrinhoCreate request)
    {
        Produto produto = produtoRepository.findById(request.produtoCodigo())
                .orElseThrow(() -> new RuntimeException("Produto nao encontrado"));

        Cliente cliente = clienteRepository.findById(idUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado de verdade"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(idUsuarioLogado)
                .orElseGet(() -> {
                    Carrinho novoCarrinho = new Carrinho();
                    novoCarrinho.setCliente(cliente);
                    novoCarrinho.setItens(new ArrayList<>());
                    return carrinhoRepository.save(novoCarrinho);
                });

        Optional<ItemCarrinho> itemExistente = carrinho.getItens().stream()
                .filter(item -> item.getProduto().getCodigo().equals(request.produtoCodigo()))
                .findFirst();

        if (itemExistente.isPresent()) {
            ItemCarrinho item = itemExistente.get();
            item.setQuantidade(item.getQuantidade() + request.quantidade());
        } else {
            ItemCarrinho novoItem = new ItemCarrinho();
            novoItem.setProduto(produto);
            novoItem.setQuantidade(request.quantidade());
            novoItem.setCarrinho(carrinho);

            carrinho.getItens().add(novoItem);
        }

        Carrinho carrinhoSalvo = carrinhoRepository.save(carrinho);

        return carrinhoMapper.toCarrinhoDto(carrinhoSalvo);
    }

    @Transactional
    public CarrinhoDto atualizarItem(Long clienteId, Long itemId, Integer novaQuantidade)
    {
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        ItemCarrinho itemCarrinho = carrinho.getItens().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Produto nao encontrado"));

        itemCarrinho.setQuantidade(novaQuantidade);
        return carrinhoMapper.toCarrinhoDto(carrinho);
    };

    @Transactional
    public CarrinhoDto excluirItemPorId(Long itemId, Long clienteId)
    {
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        carrinho.getItens().removeIf(i -> i.getId().equals(itemId));
        carrinhoRepository.save(carrinho);

        return carrinhoMapper.toCarrinhoDto(carrinho);
    };

    @Transactional
    public void esvaziarCarrinho(Long clienteId){
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        carrinho.getItens().clear();
        carrinhoRepository.save(carrinho);
    };
}
