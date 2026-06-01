package br.com.prpp.tudosaoflores.strategy;

import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class PrecificacaoMensalStrategy implements PrecificacaoAssinaturaStrategy {

    @Override
    public String getTipoPlano() {
        return "Mensal";
    }

    @Override
    public BigDecimal calcularPreco() {
        return new BigDecimal("89.90");
    }
}
