package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.ItemPedidoCreate;
import br.com.prpp.tudosaoflores.dto.PedidoCreate;
import br.com.prpp.tudosaoflores.dto.PedidoDto;
import br.com.prpp.tudosaoflores.dto.ReservaCreate;
import br.com.prpp.tudosaoflores.mapper.PedidoMapper;
import br.com.prpp.tudosaoflores.model.ItemPedido;
import br.com.prpp.tudosaoflores.model.Pedido;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.Usuario;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import br.com.prpp.tudosaoflores.repository.PedidoRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
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
    private ClienteRepository usuarioRepository;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PagamentoMockService pagamentoMockService;


    public List<PedidoDto> recuperarPedidos(Long idUsuario){
        List<Pedido> pedidos = pedidoRepository.findByUsuarioUsuarioId(idUsuario);
        return pedidoMapper.toPedidosDto(pedidos);
    }

    public PedidoDto recuperarPedidoPorId(Long idPedido){
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado"));
        return pedidoMapper.toPedidoDto(pedido);
    }

    @Transactional
    public PedidoDto cadastrarPedido(PedidoCreate request){
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        Usuario usuario = usuarioRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setData(LocalDateTime.now());
        pedido.setItens(new ArrayList<>());

        BigDecimal totalAcumulado = BigDecimal.ZERO;

        for (ItemPedidoCreate itemDto : request.itens()) {

            Produto produto = produtoRepository.findById(itemDto.idProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado ID: " + itemDto.idProduto()));

            ItemPedido novoItem = new ItemPedido(
                    pedido,
                    produto,
                    itemDto.quantidade(),
                    produto.getPreco()
            );
            BigDecimal subtotalItem = produto.getPreco().multiply(BigDecimal.valueOf(itemDto.quantidade()));
            totalAcumulado = totalAcumulado.add(subtotalItem);

            pedido.getItens().add(novoItem);
        }
        pedido.setValorTotal(totalAcumulado);
        pagamentoMockService.iniciarPagamento(pedido);
        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        pagamentoMockService.aprovarPagamento(pedidoSalvo);
        pedidoSalvo = pedidoRepository.save(pedidoSalvo);

        return pedidoMapper.toPedidoDto(pedidoSalvo);
    }

    @Transactional
    public PedidoDto cadastrarReserva(ReservaCreate request) {
        return criarReserva(request, false);
    }

    @Transactional
    public PedidoDto comprarReserva(ReservaCreate request) {
        return criarReserva(request, true);
    }

    private PedidoDto criarReserva(ReservaCreate request, boolean compraDireta) {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        Usuario usuario = usuarioRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setData(LocalDateTime.now());
        pedido.setDataReserva(request.dataReserva());
        pedido.setDataEvento(request.dataEvento());
        pedido.setTipoEvento(request.tipoEvento());
        pedido.setLocalEvento(request.localEvento());
        pedido.setFinalidadeReserva(request.finalidade());
        pedido.setObservacaoReserva(request.observacao());
        pedido.setOrigem("RESERVA");
        pedido.setStatus(compraDireta ? "RESERVA_CONFIRMADA" : "RESERVA_SOLICITADA");
        pedido.setDescricao(compraDireta ? "Compra direta de reserva para evento" : "Orçamento de reserva para evento");
        pedido.setItens(new ArrayList<>());

        BigDecimal totalAcumulado = BigDecimal.ZERO;

        for (ItemPedidoCreate itemDto : request.itens()) {
            Produto produto = produtoRepository.findById(itemDto.idProduto())
                    .orElseThrow(() -> new RuntimeException("Produto não encontrado ID: " + itemDto.idProduto()));

            validarEstoqueDisponivel(produto, itemDto.quantidade());

            ItemPedido novoItem = new ItemPedido(
                    pedido,
                    produto,
                    itemDto.quantidade(),
                    produto.getPreco()
            );

            BigDecimal subtotalItem = produto.getPreco().multiply(BigDecimal.valueOf(itemDto.quantidade()));
            totalAcumulado = totalAcumulado.add(subtotalItem);

            if (compraDireta) {
                produto.setQuantidade(produto.getQuantidade() - itemDto.quantidade());
            }

            pedido.getItens().add(novoItem);
        }

        pedido.setValorTotal(totalAcumulado);

        if (compraDireta) {
            pagamentoMockService.iniciarPagamento(pedido);
            Pedido pedidoSalvo = pedidoRepository.save(pedido);
            pagamentoMockService.aprovarPagamento(pedidoSalvo);
            pedidoSalvo.setStatus("RESERVA_CONFIRMADA");
            return pedidoMapper.toPedidoDto(pedidoRepository.save(pedidoSalvo));
        }

        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        return pedidoMapper.toPedidoDto(pedidoSalvo);
    }

    @Transactional
    public PedidoDto confirmarReserva(Long idPedido) {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        Pedido pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido nao encontrado"));

        if (pedido.getUsuario() == null || !clienteId.equals(pedido.getUsuario().getUsuarioId())) {
            throw new RuntimeException("Você não tem permissão para confirmar esta reserva");
        }

        if (!"RESERVA".equalsIgnoreCase(pedido.getOrigem())) {
            throw new RuntimeException("Pedido informado não é uma reserva");
        }

        for (ItemPedido item : pedido.getItens()) {
            Produto produto = item.getProduto();
            validarEstoqueDisponivel(produto, item.getQuantidade());
            produto.setQuantidade(produto.getQuantidade() - item.getQuantidade());
        }

        pedido.setStatus("RESERVA_CONFIRMADA");
        pagamentoMockService.iniciarPagamento(pedido);
        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        pagamentoMockService.aprovarPagamento(pedidoSalvo);
        pedidoSalvo.setStatus("RESERVA_CONFIRMADA");
        pedidoSalvo = pedidoRepository.save(pedidoSalvo);

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

        BigDecimal totalAcumulado = BigDecimal.ZERO;

        for (ItemPedidoCreate itemDto : request.itens()) {
            Produto produto = produtoRepository.findById(itemDto.idProduto())
                    .orElseThrow(() -> new RuntimeException("Produto nao encontrado"));

            ItemPedido novoItem = new ItemPedido(
                    pedido,
                    produto,
                    itemDto.quantidade(),
                    produto.getPreco()
            );

            BigDecimal subtotalItem = produto.getPreco().multiply(BigDecimal.valueOf(itemDto.quantidade()));
            totalAcumulado = totalAcumulado.add(subtotalItem);

            pedido.getItens().add(novoItem);
        }

        pedido.setValorTotal(totalAcumulado);

        Pedido pedidoAtualizado = pedidoRepository.save(pedido);
        return pedidoMapper.toPedidoDto(pedidoAtualizado);
    }

    public void removerPedido(Long idPedido){

        if (!pedidoRepository.existsById(idPedido)){
            throw new RuntimeException("Pedido nao encontrado para remocao");
        }
        pedidoRepository.deleteById(idPedido);
    }

    private void validarEstoqueDisponivel(Produto produto, Integer quantidadeSolicitada) {
        Integer quantidadeDisponivel = produto.getQuantidade();
        if (quantidadeDisponivel == null || quantidadeDisponivel < quantidadeSolicitada) {
            throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
        }
    }

}
