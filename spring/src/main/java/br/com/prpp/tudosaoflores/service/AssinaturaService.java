package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.AssinaturaCreate;
import br.com.prpp.tudosaoflores.dto.AssinaturaDto;
import br.com.prpp.tudosaoflores.mapper.AssinaturaMapper;
import br.com.prpp.tudosaoflores.model.Assinatura;
import br.com.prpp.tudosaoflores.repository.AssinaturaRepository;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssinaturaService {

    @Autowired
    private AssinaturaRepository repository;

    @Autowired
    private AssinaturaMapper mapper;

    @Transactional
    public AssinaturaDto contratarAssinatura(AssinaturaCreate dto) {
        Assinatura novaAssinatura = mapper.toAssinatura(dto);
        novaAssinatura.setStatus("Ativa");
        Assinatura salva = repository.save(novaAssinatura);
        return mapper.toAssinaturaDto(salva);
    }

    public List<AssinaturaDto> recuperarAssinaturas() {
        List<Assinatura> assinaturas = repository.findAll();
        return mapper.toAssinaturasDto(assinaturas);
    }

    public AssinaturaDto recuperarAssinaturaPorId(String id) {
        Assinatura assinatura = repository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Assinatura não encontrada!"));
        return mapper.toAssinaturaDto(assinatura);
    }

    @Transactional
    public AssinaturaDto atualizarPlano(String id, String novoPlano) {
        Assinatura assinatura = repository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Assinatura não encontrada!"));
        assinatura.setTipoPlano(novoPlano);
        Assinatura salva = repository.save(assinatura);
        return mapper.toAssinaturaDto(salva);
    }

    @Transactional
    public void cancelarAssinatura(String id) {
        Assinatura assinatura = repository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Assinatura não encontrada!"));
        assinatura.setStatus("Cancelada");
        repository.save(assinatura);
    }
}
