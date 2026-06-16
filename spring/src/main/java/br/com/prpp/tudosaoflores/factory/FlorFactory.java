package br.com.prpp.tudosaoflores.factory;

import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.Flor;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("FLORES")
public class FlorFactory implements ProdutoFactory {

    private final ObjectMapper objectMapper;

    public FlorFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Produto criar(Map<String, Object> dados) {
        return objectMapper.convertValue(dados, Flor.class);
    }

    @Override
    public String getCategoria() {
        return "FLORES";
    }
}