package br.com.prpp.tudosaoflores.strategy;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class PrecificacaoAssinaturaResolver {

    private final Map<String, PrecificacaoAssinaturaStrategy> strategies;

    public PrecificacaoAssinaturaResolver(List<PrecificacaoAssinaturaStrategy> strategies) {
        this.strategies = strategies.stream()
                .collect(Collectors.toMap(
                        PrecificacaoAssinaturaStrategy::getTipoPlano,
                        strategy -> strategy
                ));
    }

    public BigDecimal calcularPreco(String tipoPlano) {
        PrecificacaoAssinaturaStrategy strategy = strategies.get(tipoPlano);

        if (strategy == null) {
            throw new IllegalArgumentException("Plano de assinatura inválido: " + tipoPlano);
        }

        return strategy.calcularPreco();
    }
}
