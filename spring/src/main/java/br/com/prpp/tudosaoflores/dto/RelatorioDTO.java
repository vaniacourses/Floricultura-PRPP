package br.com.prpp.tudosaoflores.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

public record RelatorioDTO(
    String periodo,
    LocalDate dataInicio,
    LocalDate dataFim,
    MetricasClientes clientes,
    MetricasAssinaturas assinaturas,
    MetricasEntregas entregas,
    MetricasPedidos pedidos,
    MetricasCupons cupons,
    MetricasVendas vendas,
    BigDecimal faturamentoTotal
) {
    public record MetricasClientes(int totalClientes, int novosNoPeriodo) {}
    public record MetricasAssinaturas(int totalAtivas, int novasNoPeriodo, Map<String, Integer> porTipo) {}
    public record MetricasEntregas(int totalNoPeriodo) {}
    public record MetricasPedidos(int totalNoPeriodo) {}
    public record MetricasCupons(int totalCupons, int ativos, int novosNoPeriodo) {}
    public record MetricasVendas(String produtoMaisVendido, int quantidadeProdutoMaisVendido, String categoriaMaisVendida) {}
}