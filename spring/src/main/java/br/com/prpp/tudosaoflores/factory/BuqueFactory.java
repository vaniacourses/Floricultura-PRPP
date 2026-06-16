package br.com.prpp.tudosaoflores.factory;


import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.Buque;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("BUQUES")
public class BuqueFactory implements ProdutoFactory {

    private final ObjectMapper objectMapper;

    public BuqueFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;

    }

    @Override
    public Produto criar(Map<String, Object> dados) {
        return objectMapper.convertValue(dados, Buque.class);
    }

    @Override
    public String getCategoria() {
        return "BUQUES";
    }
}