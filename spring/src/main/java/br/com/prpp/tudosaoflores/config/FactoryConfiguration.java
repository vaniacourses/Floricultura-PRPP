package br.com.prpp.tudosaoflores.config;

import br.com.prpp.tudosaoflores.factory.ProdutoFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class FactoryConfiguration {

    @Bean
    public Map<String, ProdutoFactory> fabricas(List<ProdutoFactory> todasAsFabricas) {
        Map<String, ProdutoFactory> mapa = new HashMap<>();
        for (ProdutoFactory f : todasAsFabricas) {
            mapa.put(f.getCategoria().toUpperCase(), f);
        }
        return mapa;
    }
}