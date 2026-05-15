package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.AvaliacaoDto;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.dto.AvaliacaoCreate;
import br.com.prpp.tudosaoflores.mapper.AvaliacaoMapper;
import br.com.prpp.tudosaoflores.model.Avaliacao;
import br.com.prpp.tudosaoflores.repository.AvaliacaoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AvaliacaoService {

    @Autowired
    private AvaliacaoRepository avaliacaoRepository;

    @Autowired
    private AvaliacaoMapper avaliacaoMapper;

    //GETTERS

    public List<AvaliacaoDto> recuperarAvaliacoes(){
        List<Avaliacao> avaliacoes= avaliacaoRepository.findAll();
        return avaliacaoMapper.toAvaliacoesDto(avaliacoes);
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
        avaliacaoRepository.save(avaliacao);
        return avaliacaoMapper.toAvaliacaoDto(avaliacao);
    }

    @Transactional
    public AvaliacaoDto alterarAvaliacao(Long idAvaliacao, AvaliacaoCreate avaliacaoCreate) {
        Avaliacao avaliacao = avaliacaoRepository.findById(idAvaliacao).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Avaliacao não encontrada")
        );

        avaliacaoMapper.updateToAvaliacao(avaliacaoCreate, avaliacao);

        avaliacaoRepository.save(avaliacao);
        return avaliacaoMapper.toAvaliacaoDto(avaliacao);

    }

    @Transactional
    public void removerAvaliacaoPorId(long idAvaliacao) {
        recuperarAvaliacaoPorId(idAvaliacao);
        avaliacaoRepository.deleteById(idAvaliacao);
    }


}