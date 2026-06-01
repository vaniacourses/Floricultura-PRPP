package br.com.prpp.tudosaoflores.strategy;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PrecificacaoSemanalStrategy implements PrecificacaoAssinaturaStrategy {

    @Override
    public String getTipoPlano() {
        return "Semanal";
    }

    @Override
    public BigDecimal calcularPreco() {
        return new BigDecimal("249.90");
    }
}
