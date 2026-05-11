package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.ItemPedidoCreate;
import br.com.prpp.tudosaoflores.dto.PedidoCreate;
import br.com.prpp.tudosaoflores.dto.PedidoDto;
import br.com.prpp.tudosaoflores.mapper.PedidoMapper;
import br.com.prpp.tudosaoflores.model.ItemPedido;
import br.com.prpp.tudosaoflores.model.Pedido;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.repository.PedidoRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private PedidoMapper pedidoMapper;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    public List<PedidoDto> recuperarPedidos(Long idUsuario){
        List<Pedido> pedidos = pedidoRepository.findByUsuarioId(idUsuario);
        return pedidoMapper.toPedidosDto(pedidos);
    }

    public PedidoDto recuperarPedidoPorId(Long idPedido){
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        return pedidoMapper.toPedidoDto(pedido);
    }

    @Transactional
    public PedidoDto cadastrarPedido(PedidoCreate request){

        Usuario usuario = usuarioRepository.findById(request.idUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setData(LocalDateTime.now());

        for (ItemPedidoCreate itemDto : request.itens()) {

            Produto produto = produtoRepository.findById(itemDto.idProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado ID: " + itemDto.idProduto()));

            ItemPedido novoItem = new ItemPedido(
                    pedido,
                    produto,
                    itemDto.quantidade(),
                    produto.getPreco()
            );

            pedido.getItens().add(novoItem);
        }

        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        return pedidoMapper.toPedidoDto(pedidoSalvo);
    }

    @Transactional
    public PedidoDto alterarPedido(Long idPedido, PedidoCreate request){

        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(()-> new RuntimeException("Pedido nao encontrado"));

        Usuario usuario = usuarioRepository.findById(request.idUsuario())
                .orElseThrow(()-> new RuntimeException("Usuario nao encontrado"));

        pedido.setUsuario(usuario);

        pedido.getItens().clear();

        for (ItemPedidoCreate itemDto : request.itens()) {
            Produto produto = produtoRepository.findById(itemDto.idProduto())
                    .orElseThrow(() -> new RuntimeException("Produto nao encontrado"));


            ItemPedido novoItem = new ItemPedido(
                    pedido,
                    produto,
                    itemDto.quantidade(),
                    produto.getPreco()
            );

            pedido.getItens().add(novoItem);
        }

        Pedido pedidoAtualizado = pedidoRepository.save(pedido);

        return pedidoMapper.toPedidoDto(pedidoAtualizado);
    }

    public void removerPedido(Long idPedido){

        if (!pedidoRepository.existsById(idPedido)){
            throw new RuntimeException("Pedido nao encontrado para remocao");
        }
        pedidoRepository.deleteById(idPedido);
    }

}
