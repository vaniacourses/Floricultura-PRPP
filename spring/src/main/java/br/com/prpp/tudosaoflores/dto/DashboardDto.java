package br.com.prpp.tudosaoflores.dto;

import java.math.BigDecimal;
import java.util.List;
import br.com.prpp.tudosaoflores.dto.produtosdto.ProdutoDto;

public record DashboardDto (
    List<PedidoResumoDto> pedidosHoje,
    List<EntregaResumoDto> entregasHoje,
    List<EntregaResumoDto> entregasAssinatura,
    BigDecimal faturamentoHoje,
    long totalPedidosHoje,
    List<ProdutoDto> estoqueCritico 
) {}


