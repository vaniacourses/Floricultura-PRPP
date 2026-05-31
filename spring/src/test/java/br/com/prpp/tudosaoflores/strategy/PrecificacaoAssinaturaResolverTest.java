package br.com.prpp.tudosaoflores.strategy;

import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;

class PrecificacaoAssinaturaResolverTest {

    private final PrecificacaoAssinaturaResolver resolver = new PrecificacaoAssinaturaResolver(List.of(
            new PrecificacaoMensalStrategy(),
            new PrecificacaoQuinzenalStrategy(),
            new PrecificacaoSemanalStrategy()
    ));

    @Test
    void deveCalcularPrecoDeCadaPlanoComStrategyCorreta() {
        assertEquals(new BigDecimal("89.90"), resolver.calcularPreco("Mensal"));
        assertEquals(new BigDecimal("149.90"), resolver.calcularPreco("Quinzenal"));
        assertEquals(new BigDecimal("249.90"), resolver.calcularPreco("Semanal"));
    }

    @Test
    void deveLancarExcecaoParaPlanoInvalido() {
        assertThrows(
                IllegalArgumentException.class,
                () -> resolver.calcularPreco("Anual")
        );
    }
}
