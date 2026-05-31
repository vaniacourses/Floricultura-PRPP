package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.*;
import br.com.prpp.tudosaoflores.dto.produtosdto.ProdutoDto;
import br.com.prpp.tudosaoflores.mapper.PedidoMapper;
import br.com.prpp.tudosaoflores.mapper.ProdutoMapper;
import br.com.prpp.tudosaoflores.model.Pedido;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.repository.PedidoRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private PedidoRepository pedidoRepo;
    @Autowired
    private ProdutoRepository produtoRepo;
    @Autowired
    private PedidoMapper pedidoMapper;
    @Autowired
    private ProdutoMapper produtoMapper;

    public DashboardDto getDashboardHoje() {
        LocalDate hoje = LocalDate.now();
        LocalDateTime inicio = hoje.atStartOfDay();
        LocalDateTime fim = hoje.atTime(23, 59, 59);

        // Pedidos do dia (já com itens e usuário)
        List<Pedido> pedidos = pedidoRepo.findByDataBetweenCompleto(inicio, fim);
        List<PedidoResumoDto> pedidosHoje = pedidoMapper.toPedidosResumo(pedidos);

        // Total de pedidos
        long totalPedidos = pedidos.size();

        // Faturamento (*** ajuste os status reais ***)
        List<String> statusValidos = List.of("PAGO", "ENVIADO", "ENTREGUE", "CONCLUIDO");
        BigDecimal faturamento = pedidoRepo.faturamentoDia(inicio, fim, statusValidos);

        // Estoque crítico (< 10)
        List<Produto> criticos = produtoRepo.findByQuantidadeLessThan(10);
        List<ProdutoDto> estoqueCritico = produtoMapper.toProdutosDto(criticos);

        // Entregas (placeholder)
        List<EntregaResumoDto> entregas = Collections.emptyList();
        List<EntregaResumoDto> entregasAssinatura = Collections.emptyList();

        return new DashboardDto(
            pedidosHoje,
            entregas,
            entregasAssinatura,
            faturamento,
            totalPedidos,
            estoqueCritico
        );
    }
}