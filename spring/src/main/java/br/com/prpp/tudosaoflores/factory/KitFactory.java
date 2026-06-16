package br.com.prpp.tudosaoflores.factory;

import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.Kit;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("KITS")
public class KitFactory implements ProdutoFactory {

    private final ObjectMapper objectMapper;

    public KitFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Produto criar(Map<String, Object> dados) {
        return objectMapper.convertValue(dados, Kit.class);
    }

    @Override
    public String getCategoria() {
        return "KITS";
    }
}
