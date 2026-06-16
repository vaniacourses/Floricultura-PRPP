package br.com.prpp.tudosaoflores.factory;

import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.FlorSeca;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("FLORES_SECAS")
public class FlorSecaFactory implements ProdutoFactory {

    private final ObjectMapper objectMapper;

    public FlorSecaFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Produto criar(Map<String, Object> dados) {
        return objectMapper.convertValue(dados, FlorSeca.class);
    }

    @Override
    public String getCategoria() {
        return "FLORES_SECAS"; 
    }
}
