package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.ProdutoDto;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.dto.ProdutoCreate;
import br.com.prpp.tudosaoflores.mapper.ProdutoMapper;
import br.com.prpp.tudosaoflores.model.Categoria;
import br.com.prpp.tudosaoflores.model.Produto;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

   @Autowired
   private ProdutoMapper produtoMapper;

    //GETTERS

   //Todos os produtos do sistema
    public List<ProdutoDto> recuperarProdutos(){
        List<Produto> produtos = produtoRepository.findAll();
        return produtoMapper.toProdutosDto(produtos);
    }
    //Produtos por Categoria
    public List<ProdutoDto> recuperarProdutosPorCategoria(Categoria categoria){
        List<Produto> produtos = produtoRepository.findByCategoria(categoria);
        return produtoMapper.toProdutosDto(produtos);
    }

    //Produto por Id
    public ProdutoDto recuperarProdutoPorCodigo(Long codigo){
        Produto produto = produtoRepository.findById(codigo).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Produto com código " + codigo + " não encontrado")
        );
        return produtoMapper.toProdutoDto(produto);
    }

    //Criando Novo Produto
    @Transactional
    public ProdutoDto cadastrarProduto(ProdutoCreate produtoCreate){
        Produto produto = produtoMapper.toProduto(produtoCreate);
        produtoRepository.save(produto);
        return produtoMapper.toProdutoDto(produto);
    }

    //Alterando Produto já existente
    @Transactional
    public ProdutoDto alterarProduto(Long codigo, ProdutoCreate produtoCreate) {
        Produto produto = produtoRepository.findById(codigo).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Produto não encontrado")
        );

        produtoMapper.updateToProduto(produtoCreate, produto);

        produtoRepository.save(produto);
        return produtoMapper.toProdutoDto(produto);

    }

    //Removendo produto de acordo com o Código (id)
    @Transactional
    public void removerProdutoPorCodigo(long codigo) {
        recuperarProdutoPorCodigo(codigo);
        produtoRepository.deleteById(codigo);
    }


}
