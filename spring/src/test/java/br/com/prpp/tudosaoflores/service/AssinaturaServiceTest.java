package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.AssinaturaCreate;
import br.com.prpp.tudosaoflores.dto.AssinaturaDto;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.mapper.AssinaturaMapper;
import br.com.prpp.tudosaoflores.model.Assinatura;
import br.com.prpp.tudosaoflores.repository.AssinaturaRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mapstruct.factory.Mappers;
import org.springframework.test.util.ReflectionTestUtils;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

class AssinaturaServiceTest {

    private AssinaturaRepository repository;
    private AssinaturaService service;

    @BeforeEach
    void setUp() {
        repository = mock(AssinaturaRepository.class);
        service = new AssinaturaService();
        AssinaturaMapper mapper = Mappers.getMapper(AssinaturaMapper.class);

        ReflectionTestUtils.setField(service, "repository", repository);
        ReflectionTestUtils.setField(service, "mapper", mapper);
    }

    @Test
    void deveContratarAssinaturaAtivaComIdGerado() {
        when(repository.save(any(Assinatura.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AssinaturaDto criada = service.contratarAssinatura(new AssinaturaCreate("Mensal"));

        assertNotNull(criada.getIdAssinatura());
        assertEquals("Mensal", criada.getTipoPlano());
        assertEquals("Ativa", criada.getStatus());
        verify(repository).save(any(Assinatura.class));
    }

    @Test
    void deveRecuperarAssinaturasCadastradas() {
        Assinatura assinatura = new Assinatura();
        assinatura.setTipoPlano("Semanal");
        assinatura.setStatus("Ativa");
        when(repository.findAll()).thenReturn(List.of(assinatura));

        List<AssinaturaDto> assinaturas = service.recuperarAssinaturas();

        assertEquals(1, assinaturas.size());
        assertEquals("Semanal", assinaturas.get(0).getTipoPlano());
        assertEquals("Ativa", assinaturas.get(0).getStatus());
    }

    @Test
    void deveAtualizarPlanoDaAssinatura() {
        Assinatura assinatura = new Assinatura();
        assinatura.setTipoPlano("Mensal");
        assinatura.setStatus("Ativa");
        when(repository.findById(assinatura.getIdAssinatura())).thenReturn(Optional.of(assinatura));
        when(repository.save(any(Assinatura.class))).thenAnswer(invocation -> invocation.getArgument(0));

        AssinaturaDto atualizada = service.atualizarPlano(assinatura.getIdAssinatura(), "Anual");

        assertEquals("Anual", atualizada.getTipoPlano());
        assertEquals("Ativa", atualizada.getStatus());
    }

    @Test
    void deveCancelarAssinaturaAlterandoStatus() {
        Assinatura assinatura = new Assinatura();
        assinatura.setTipoPlano("Mensal");
        assinatura.setStatus("Ativa");
        when(repository.findById(assinatura.getIdAssinatura())).thenReturn(Optional.of(assinatura));

        service.cancelarAssinatura(assinatura.getIdAssinatura());

        assertEquals("Cancelada", assinatura.getStatus());
        verify(repository).save(assinatura);
    }

    @Test
    void deveLancarExcecaoQuandoAssinaturaNaoExistir() {
        when(repository.findById("id-inexistente")).thenReturn(Optional.empty());

        assertThrows(
                EntidadeNaoEncontradaException.class,
                () -> service.recuperarAssinaturaPorId("id-inexistente")
        );
    }
}
