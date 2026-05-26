package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.produtosdto.ProdutoDto;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.factory.ProdutoFactory;
import br.com.prpp.tudosaoflores.mapper.ProdutoMapper;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.model.produtos.*;
import br.com.prpp.tudosaoflores.observer.NotificacaoBancoObserver;
import br.com.prpp.tudosaoflores.observer.ProdutoObserver;
import br.com.prpp.tudosaoflores.observer.ProdutoPublisher;
import br.com.prpp.tudosaoflores.repository.NotificacaoRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ProdutoService implements ProdutoPublisher {
    private final ProdutoRepository produtoRepository;
    private final Map<String, ProdutoFactory> fabricas;
    private final ProdutoMapper produtoMapper;
    private final ObjectMapper objectMapper;
    private final NotificacaoBancoObserver notificacaoBanco;
    private final List<ProdutoObserver> observers = new ArrayList<>();

    //Configura os ouvintes
    @PostConstruct
    public void inicializarSubscribers() {
        addObserver(notificacaoBanco);
    }

    // GET - Recupera todos os produtos (retorna uma lista polimórfica de FlorDto, BuqueDto...)
    public List<ProdutoDto> recuperarProdutos() {
        List<Produto> produtos = produtoRepository.findAll();
        return produtoMapper.toProdutosDto(produtos);
    }

    // GET - Filtra produtos por uma categoria específica através do banco de dados
    public List<ProdutoDto> recuperarProdutosPorCategoria(String categoria) {
        Class<? extends Produto> classeCategoria = mapearCategoriaParaClasse(categoria);
        List<Produto> produtos = produtoRepository.findByCategoria(classeCategoria);
        return produtoMapper.toProdutosDto(produtos);
    }

    // GET - Busca um produto específico pelo código
    public ProdutoDto recuperarProdutoPorCodigo(Long codigo) {
        Produto produto = produtoRepository.findById(codigo).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Produto com código " + codigo + " não encontrado")
        );
        return produtoMapper.toProdutoDto(produto);
    }

    @Transactional
    public ProdutoDto cadastrarProduto(String categoria, Map<String, Object> dados) {

        String categoriaNormalizada = categoria.toUpperCase().trim();


        System.out.println(">>> Categoria recebida: " + categoria);
        System.out.println(">>> Categoria normalizada: " + categoriaNormalizada);
        System.out.println(">>> Fábricas disponíveis: " + fabricas.keySet());
        System.out.println(">>> Dados recebidos: " + dados);

        ProdutoFactory fabrica = fabricas.get(categoriaNormalizada);
        System.out.println(">>> Fábrica encontrada: " + fabrica);
        mapearCategoriaParaClasse(categoriaNormalizada);


        if (fabrica == null) {
            throw new IllegalArgumentException("Nenhuma fábrica encontrada para a chave: " + categoriaNormalizada);
        }

        Produto produto = fabrica.criar(dados);
        produtoRepository.save(produto);
        return produtoMapper.toProdutoDto(produto);
    }

    // PUT / PATCH - Atualiza uma entidade de forma reflexiva e dispara o Observer
    @Transactional
    public ProdutoDto alterarProduto(Long codigo, Map<String, Object> dados) {
        // 1. Busca o produto atual antes de ser modificado
        Produto produtoExistente = produtoRepository.findById(codigo).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Produto com código " + codigo + " não encontrado")
        );


        int estoqueAntigo = produtoExistente.getQuantidade();
        BigDecimal precoAntigo = produtoExistente.getPreco();

        try {

            objectMapper.readerForUpdating(produtoExistente).readValue(objectMapper.writeValueAsString(dados));
        } catch (Exception e) {
            throw new RuntimeException("Erro ao atualizar os dados dinâmicos do produto", e);
        }


        Produto produtoSalvo = produtoRepository.save(produtoExistente);


        int estoqueNovo = produtoSalvo.getQuantidade();
        BigDecimal precoNovo = produtoSalvo.getPreco();

        //LÓGICA DO OBSERVER
        // Se o preço baixou
        if (precoAntigo != null && precoNovo != null && precoNovo.compareTo(precoAntigo) < 0) {
            String msg = String.format("Aproveite! Redução de preço em '%s', de R$ %s por apenas R$ %s.",
                    produtoSalvo.getNome(), precoAntigo.toString(), precoNovo.toString());
            notifyObservers(produtoSalvo, msg);
        }

        // Se o produto estava esgotado e voltou ao estoque
        if (estoqueAntigo == 0 && estoqueNovo > 0) {
            String msg = String.format("Produto de volta ao estoque! Nosso produto: '%s' está disponível novamente",
                    produtoSalvo.getNome());
            notifyObservers(produtoSalvo, msg);
        }

        return produtoMapper.toProdutoDto(produtoSalvo);
    }

    // DELETE - Remove o produto por código
    @Transactional
    public void removerProdutoPorCodigo(Long codigo) {
        if (!produtoRepository.existsById(codigo)) {
            throw new EntidadeNaoEncontradaException("Produto com código " + codigo + " não encontrado");
        }
        produtoRepository.deleteById(codigo);
    }


    private Class<? extends Produto> mapearCategoriaParaClasse(String categoria) {
        return switch (categoria.trim().toLowerCase()) {
            case "flor", "flores" -> Flor.class;
            case "flor_seca", "flores_secas" -> FlorSeca.class;
            case "buque", "buques" -> Buque.class;
            case "arranjo", "arranjos" -> Arranjo.class;
            case "cartao", "cartoes" -> Cartao.class;
            case "kit", "kits" -> Kit.class;
            default -> throw new IllegalArgumentException("Categoria desconhecida: " + categoria);
        };
    }


    @Override
    public void addObserver(ProdutoObserver observer) {
        this.observers.add(observer);
    }

    @Override
    public void removeObserver(ProdutoObserver observer) {
        this.observers.remove(observer);
    }

    @Override
    public void notifyObservers(Produto produto, String mensagem) {
        for (ProdutoObserver observer : observers) {
            observer.update(produto, mensagem);
        }
    }
}