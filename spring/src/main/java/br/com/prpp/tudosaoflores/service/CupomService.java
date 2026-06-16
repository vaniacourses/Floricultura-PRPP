package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.CupomDto;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.dto.CupomCreate;
import br.com.prpp.tudosaoflores.mapper.CupomMapper;
import br.com.prpp.tudosaoflores.model.Cupom;
import br.com.prpp.tudosaoflores.repository.CupomRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CupomService {

    @Autowired
    private CupomRepository cupomRepository;

    @Autowired
    private CupomMapper cupomMapper;


    public List<CupomDto> recuperarCupons(){
        List<Cupom> cupons= cupomRepository.findAll();
        return cupomMapper.toCuponsDto(cupons);
    }

    public CupomDto recuperarCupomPorId(Long idCupom){
        Cupom cupom = cupomRepository.findById(idCupom).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Cupom com id " + idCupom+ " não encontrado")
        );
        return cupomMapper.toCupomDto(cupom);
    }


    @Transactional
    public CupomDto cadastrarCupom(CupomCreate cupomCreate){
        Cupom cupom = cupomMapper.toCupom(cupomCreate);
        cupomRepository.save(cupom);
        return cupomMapper.toCupomDto(cupom);
    }

    @Transactional
    public CupomDto alterarCupom(Long idCupom, CupomCreate cupomCreate) {
        Cupom cupom = cupomRepository.findById(idCupom).orElseThrow(
                () -> new EntidadeNaoEncontradaException("Cupom não encontrado")
        );

        cupomMapper.updateToCupom(cupomCreate, cupom);

        cupomRepository.save(cupom);
        return cupomMapper.toCupomDto(cupom);

    }

    @Transactional
    public void removerCupomPorId(long idCupom) {
        recuperarCupomPorId(idCupom);
        cupomRepository.deleteById(idCupom);
    }


}
