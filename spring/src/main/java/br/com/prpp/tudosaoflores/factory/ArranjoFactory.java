package br.com.prpp.tudosaoflores.factory;

import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.Arranjo;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("ARRANJOS")
public class ArranjoFactory implements ProdutoFactory {

    private final ObjectMapper objectMapper;

    public ArranjoFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Produto criar(Map<String, Object> dados) {
        return objectMapper.convertValue(dados, Arranjo.class);
    }

    @Override
    public String getCategoria() {
        return "ARRANJOS";
    }
}