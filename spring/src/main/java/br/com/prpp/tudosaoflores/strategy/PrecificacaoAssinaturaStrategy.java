package br.com.prpp.tudosaoflores.strategy;

import java.math.BigDecimal;

public interface PrecificacaoAssinaturaStrategy {

    String getTipoPlano();

    BigDecimal calcularPreco();
}
