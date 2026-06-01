package br.com.prpp.tudosaoflores.strategy;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PrecificacaoQuinzenalStrategy implements PrecificacaoAssinaturaStrategy {

    @Override
    public String getTipoPlano() {
        return "Quinzenal";
    }

    @Override
    public BigDecimal calcularPreco() {
        return new BigDecimal("149.90");
    }
}
