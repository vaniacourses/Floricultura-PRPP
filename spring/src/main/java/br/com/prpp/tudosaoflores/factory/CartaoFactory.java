package br.com.prpp.tudosaoflores.factory;

import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.Cartao;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service("CARTOES")
public class CartaoFactory implements ProdutoFactory {

    private final ObjectMapper objectMapper;

    public CartaoFactory(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    public Produto criar(Map<String, Object> dados) {
        return objectMapper.convertValue(dados, Cartao.class);
    }

    @Override
    public String getCategoria() {
        return "CARTOES"; // Deve ser exatamente o que o Frontend envia
    }
}
