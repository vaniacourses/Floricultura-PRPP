package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.RelatorioDTO;
import br.com.prpp.tudosaoflores.dto.RelatorioDTO.MetricasVendas;
import br.com.prpp.tudosaoflores.model.*;
import br.com.prpp.tudosaoflores.repository.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.*;
import java.time.temporal.TemporalAdjusters;
import java.util.*;

@Service
public class RelatorioService {

    private final ClienteRepository clienteRepo;
    private final AssinaturaRepository assinaturaRepo;
    private final PedidoRepository pedidoRepo;
    private final CupomRepository cupomRepo;
    // private final EntregaRepository entregaRepo;  

    public RelatorioService(ProdutoRepository produtoRepo, // Mantido no construtor se preferir não mexer nas injeções de dependência agora
                            ClienteRepository clienteRepo,
                            AssinaturaRepository assinaturaRepo,
                            PedidoRepository pedidoRepo,
                            CupomRepository cupomRepo) {
        this.clienteRepo = clienteRepo;
        this.assinaturaRepo = assinaturaRepo;
        this.pedidoRepo = pedidoRepo;
        this.cupomRepo = cupomRepo;
    }

    @Transactional(readOnly = true)
    public RelatorioDTO gerarRelatorio(String periodo) {
        LocalDate hoje = LocalDate.now();
        LocalDate inicio = switch (periodo) {
            case "semana" -> hoje.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
            case "ano"   -> hoje.withDayOfYear(1);
            default      -> hoje.withDayOfMonth(1); 
        };
        LocalDate fim = hoje;

        // Clientes       
        int totalClientes = (int) clienteRepo.count();
        int novosClientes = clienteRepo.countByCreatedAtBetween(inicio, fim);

        // Assinaturas
        int totalAtivas = assinaturaRepo.countByStatus("ativa");
        int novasAssinaturas = assinaturaRepo.countByCreatedAtBetween(inicio, fim); 
        
        Map<String, Integer> assinaturasPorTipo = new HashMap<>();
        for (Assinatura a : assinaturaRepo.findAll()) {
            assinaturasPorTipo.merge(a.getTipoPlano(), 1, Integer::sum);
        }
       
        // Entregas (Mantido estático conforme solicitado)
        int totalEntregas = 0;
        // totalEntregas = entregaRepo.countByDataEntregaBetween(inicio, fim);

        // Pedidos & Faturamento
        LocalDateTime inicioDateTime = inicio.atStartOfDay();
        LocalDateTime fimDateTime = fim.atTime(LocalTime.MAX);
        List<Pedido> pedidosPeriodo = pedidoRepo.findByDataBetweenWithItens(inicioDateTime, fimDateTime);
        
        int totalPedidos = pedidosPeriodo.size();
        BigDecimal faturamentoTotal = pedidosPeriodo.stream()
                .map(Pedido::getValorTotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        // Destaques de Vendas
        Map<Produto, Integer> vendasPorProduto = new HashMap<>();
        Map<String, Integer> vendasPorCategoria = new HashMap<>();

        for (Pedido pedido : pedidosPeriodo) {
            for (ItemPedido item : pedido.getItens()) {
                Produto p = item.getProduto();
                vendasPorProduto.merge(p, item.getQuantidade(), Integer::sum);
                
                String categoria = p.getClass().getSimpleName(); 
                vendasPorCategoria.merge(categoria, item.getQuantidade(), Integer::sum);
            }
        }

        // Produto mais vendido
        Map.Entry<Produto, Integer> maisVendido = vendasPorProduto.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .orElse(null);

        String nomeProdutoMaisVendido = maisVendido != null ? maisVendido.getKey().getNome() : "Nenhum";
        int qtdMaisVendido = maisVendido != null ? maisVendido.getValue() : 0;

        // Categoria mais vendida
        String categoriaMaisVendida = vendasPorCategoria.entrySet().stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("Nenhuma");

        MetricasVendas metricasVendas = new MetricasVendas(
                nomeProdutoMaisVendido, qtdMaisVendido, categoriaMaisVendida
        );

        // Cupons
        int totalCupons = (int) cupomRepo.count();
        int cuponsAtivos = cupomRepo.countByDataInicioLessThanEqualAndDataFimGreaterThanEqual(hoje, hoje);
        int novosCupons = cupomRepo.countByDataInicioBetween(inicio, fim);


        return new RelatorioDTO(
                periodo, inicio, fim,
                new RelatorioDTO.MetricasClientes(totalClientes, novosClientes),
                new RelatorioDTO.MetricasAssinaturas(totalAtivas, novasAssinaturas, assinaturasPorTipo),
                new RelatorioDTO.MetricasEntregas(totalEntregas),
                new RelatorioDTO.MetricasPedidos(totalPedidos),
                new RelatorioDTO.MetricasCupons(totalCupons, cuponsAtivos, novosCupons),
                metricasVendas,
                faturamentoTotal
        );
    }
}