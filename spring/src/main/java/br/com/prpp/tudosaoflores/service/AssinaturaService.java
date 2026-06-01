package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.AssinaturaCreate;
import br.com.prpp.tudosaoflores.dto.AssinaturaDto;
import br.com.prpp.tudosaoflores.mapper.AssinaturaMapper;
import br.com.prpp.tudosaoflores.model.Assinatura;
import br.com.prpp.tudosaoflores.model.Pedido;
import br.com.prpp.tudosaoflores.model.Usuario;
import br.com.prpp.tudosaoflores.repository.AssinaturaRepository;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import br.com.prpp.tudosaoflores.repository.PedidoRepository;
import br.com.prpp.tudosaoflores.exception.EntidadeNaoEncontradaException;
import br.com.prpp.tudosaoflores.strategy.PrecificacaoAssinaturaResolver;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssinaturaService {

    @Autowired
    private AssinaturaRepository repository;

    @Autowired
    private AssinaturaMapper mapper;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ClienteService clienteService;

    @Autowired
    private PrecificacaoAssinaturaResolver precificacaoAssinaturaResolver;

    private Optional<Assinatura> buscarAssinaturaAtivaRecente(Long clienteId) {
        return repository.findFirstByUsuarioUsuarioIdAndStatusIgnoreCaseAndDataContratacaoAfterOrderByDataContratacaoDesc(
                clienteId,
                "Ativa",
                LocalDateTime.now().minusMonths(1)
        );
    }

    public boolean clienteTemAssinaturaAtivaRecente(Long clienteId) {
        return buscarAssinaturaAtivaRecente(clienteId).isPresent();
    }

    public void validarClienteSemAssinaturaAtivaRecente(Long clienteId) {
        if (clienteTemAssinaturaAtivaRecente(clienteId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Você já possui uma assinatura ativa.");
        }
    }

    @Transactional
    public AssinaturaDto contratarAssinatura(AssinaturaCreate dto) {
        Assinatura novaAssinatura = mapper.toAssinatura(dto);
        novaAssinatura.setStatus("Ativa");
        Assinatura salva = repository.save(novaAssinatura);
        return mapper.toAssinaturaDto(salva);
    }

    @Transactional
    public AssinaturaDto comprarAssinatura(AssinaturaCreate dto) {
        BigDecimal valorPlano = precificacaoAssinaturaResolver.calcularPreco(dto.getTipoPlano());
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        validarClienteSemAssinaturaAtivaRecente(clienteId);
        Usuario usuario = clienteRepository.findById(clienteId)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado"));

        Assinatura assinatura = mapper.toAssinatura(dto);
        assinatura.setUsuario(usuario);
        assinatura.setStatus("Ativa");
        assinatura.setValorPlano(valorPlano);
        assinatura.setDataContratacao(LocalDateTime.now());

        Assinatura assinaturaSalva = repository.save(assinatura);

        Pedido pedido = new Pedido();
        pedido.setUsuario(usuario);
        pedido.setData(LocalDateTime.now());
        pedido.setStatus("PROCESSANDO");
        pedido.setValorTotal(valorPlano);
        pedido.setOrigem("ASSINATURA");
        pedido.setDescricao("Assinatura " + assinaturaSalva.getTipoPlano());
        pedido.setIdAssinatura(assinaturaSalva.getIdAssinatura());
        pedido.setEstiloAssinatura(assinaturaSalva.getEstiloArranjo());
        pedido.setCoresAssinatura(assinaturaSalva.getCoresPreferidas());
        pedido.setObservacaoAssinatura(assinaturaSalva.getObservacao());

        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        assinaturaSalva.setIdPedido(pedidoSalvo.getId());
        Assinatura assinaturaAtualizada = repository.save(assinaturaSalva);

        return mapper.toAssinaturaDto(assinaturaAtualizada);
    }

    public Optional<AssinaturaDto> recuperarMinhaAssinaturaAtiva() {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        return buscarAssinaturaAtivaRecente(clienteId)
                .map(mapper::toAssinaturaDto);
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
        Assinatura assinatura = buscarAssinaturaDoClienteAutenticado(id);
        BigDecimal valorPlano = precificacaoAssinaturaResolver.calcularPreco(novoPlano);

        assinatura.setTipoPlano(novoPlano);
        assinatura.setValorPlano(valorPlano);
        Assinatura salva = repository.save(assinatura);
        return mapper.toAssinaturaDto(salva);
    }

    @Transactional
    public void cancelarAssinatura(String id) {
        Assinatura assinatura = buscarAssinaturaDoClienteAutenticado(id);
        assinatura.setStatus("Cancelada");
        repository.save(assinatura);
    }

    private Assinatura buscarAssinaturaDoClienteAutenticado(String id) {
        Long clienteId = clienteService.obterClienteAutenticado().getUsuarioId();
        Assinatura assinatura = repository.findById(id)
                .orElseThrow(() -> new EntidadeNaoEncontradaException("Assinatura não encontrada!"));

        if (assinatura.getUsuario() == null || !clienteId.equals(assinatura.getUsuario().getUsuarioId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Você não tem permissão para alterar esta assinatura.");
        }

        return assinatura;
    }

}
