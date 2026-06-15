package br.com.prpp.tudosaoflores.config;

import br.com.prpp.tudosaoflores.model.Cupom;
import br.com.prpp.tudosaoflores.repository.CupomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;

@Component
public class CupomSeed implements CommandLineRunner {

    public static final String CUPOM_PRIMEIRA_COMPRA = "PRIMEIRACOMPRA10";

    @Autowired
    private CupomRepository cupomRepository;

    @Override
    public void run(String... args) {
        Cupom cupom = cupomRepository.findByNomeCupomIgnoreCase(CUPOM_PRIMEIRA_COMPRA)
                .orElseGet(Cupom::new);

        cupom.setNomeCupom(CUPOM_PRIMEIRA_COMPRA);
        cupom.setDesconto(new BigDecimal("0.10"));
        cupom.setDescricao("Cupom de 10% de desconto para a primeira compra.");
        cupom.setLimiteDeUso(1000);
        cupom.setDataInicio(LocalDate.now());
        cupom.setDataFim(LocalDate.now().plusYears(1));

        cupomRepository.save(cupom);
    }
}
