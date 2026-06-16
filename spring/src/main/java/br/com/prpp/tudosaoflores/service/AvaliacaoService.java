package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.AvaliacaoDto;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.dto.AvaliacaoCreate;
import br.com.prpp.tudosaoflores.mapper.AvaliacaoMapper;
import br.com.prpp.tudosaoflores.model.Avaliacao;
import br.com.prpp.tudosaoflores.repository.AvaliacaoRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class AvaliacaoService {

    private static final Logger logger = LoggerFactory.getLogger(AvaliacaoService.class);

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private AvaliacaoMapper avaliacaoMapper;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;


    public List<AvaliacaoDto> recuperarAvaliacoesPorProduto(Long codigo) {
        List<Avaliacao> avaliacoes = avaliacaoRepository.findByProduto_codigo(codigo);
        logger.info("recuperarAvaliacoesPorProduto: Found {} avaliacoes for codigo={}", avaliacoes.size(), codigo);
        for (Avaliacao a : avaliacoes) {
            logger.info("  - Avaliacao id={}, produto={}, usuario={}", a.getIdAvaliacao(), 
                    a.getProduto() != null ? a.getProduto().getCodigo() : "NULL",
                    a.getUsuario() != null ? a.getUsuario().getUsuarioId() : "NULL");
        }

        return avaliacoes.stream()
                .filter(a -> a.getProduto() != null && a.getUsuario() != null)
                .map(avaliacaoMapper::toAvaliacaoDto)
                .toList();
    }

    public List<AvaliacaoDto> recuperarAvaliacoesPorUsuario(Long usuarioCodigo) {
        List<Avaliacao> avaliacoes = avaliacaoRepository.findByUsuario_usuarioId(usuarioCodigo);
        logger.info("recuperarAvaliacoesPorUsuario: Found {} avaliacoes for usuarioId={}", avaliacoes.size(), usuarioCodigo);
        for (Avaliacao a : avaliacoes) {
            logger.info("  - Avaliacao id={}, produto={}, usuario={}", a.getIdAvaliacao(), 
                    a.getProduto() != null ? a.getProduto().getCodigo() : "NULL",
                    a.getUsuario() != null ? a.getUsuario().getUsuarioId() : "NULL");
        }

        return avaliacoes.stream()
                .filter(a -> a.getProduto() != null && a.getUsuario() != null)
                .map(avaliacaoMapper::toAvaliacaoDto)
                .toList();
    }

    public AvaliacaoDto recuperarAvaliacaoPorId(Long idAvaliacao){
        Avaliacao avaliacao = avaliacaoRepository.findById(idAvaliacao).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Avaliacao com id " + idAvaliacao+ " não encontrada")
        );
        return avaliacaoMapper.toAvaliacaoDto(avaliacao);
    }

    @Transactional
    public AvaliacaoDto cadastrarAvaliacao(AvaliacaoCreate avaliacaoCreate){
        Avaliacao avaliacao = avaliacaoMapper.toAvaliacao(avaliacaoCreate);

        var produto = produtoRepository.findById(avaliacaoCreate.produtoId()).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Produto não encontrado")
        );

        var cliente = clienteRepository.findById(avaliacaoCreate.usuarioId()).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Cliente não encontrado com o ID fornecido")
        );

        avaliacao.setProduto(produto);
        avaliacao.setUsuario(cliente);

        Avaliacao avaliacaoSalva = avaliacaoRepository.save(avaliacao);
        return avaliacaoMapper.toAvaliacaoDto(avaliacaoSalva);
    }

    @Transactional
    public AvaliacaoDto alterarAvaliacao(Long idAvaliacao, AvaliacaoCreate avaliacaoCreate) {
        Avaliacao avaliacao = avaliacaoRepository.findById(idAvaliacao).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Avaliacao não encontrada")
        );

        avaliacaoMapper.updateToAvaliacao(avaliacaoCreate, avaliacao);

        var produto = produtoRepository.findById(avaliacaoCreate.produtoId()).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Produto não encontrado")
        );

        var cliente = clienteRepository.findById(avaliacaoCreate.usuarioId()).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Cliente não encontrado com o ID fornecido")
        );

        avaliacao.setProduto(produto);
        avaliacao.setUsuario(cliente);

        Avaliacao avaliacaoAtualizada = avaliacaoRepository.save(avaliacao);
        return avaliacaoMapper.toAvaliacaoDto(avaliacaoAtualizada);
    }

    @Transactional
    public void removerAvaliacaoPorId(long idAvaliacao) {
        recuperarAvaliacaoPorId(idAvaliacao);
        avaliacaoRepository.deleteById(idAvaliacao);
    }
}