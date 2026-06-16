package br.com.prpp.tudosaoflores.service;

import br.com.prpp.tudosaoflores.dto.CarrinhoDto;
import br.com.prpp.tudosaoflores.dto.FinalizarCompraRequest;
import br.com.prpp.tudosaoflores.dto.ItemCarrinhoCreate;
import br.com.prpp.tudosaoflores.dto.AssinaturaCreate;
import br.com.prpp.tudosaoflores.config.CupomSeed;
import br.com.prpp.tudosaoflores.mapper.CarrinhoMapper;
import br.com.prpp.tudosaoflores.model.*;
import br.com.prpp.tudosaoflores.repository.CarrinhoRepository;
import br.com.prpp.tudosaoflores.repository.ClienteRepository;
import br.com.prpp.tudosaoflores.repository.PedidoRepository;
import br.com.prpp.tudosaoflores.repository.ProdutoRepository;
import br.com.prpp.tudosaoflores.repository.AssinaturaRepository;
import br.com.prpp.tudosaoflores.repository.CupomRepository;
import br.com.prpp.tudosaoflores.repository.EnderecoRepository;
import br.com.prpp.tudosaoflores.strategy.PrecificacaoAssinaturaResolver;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Optional;


@Service
public class CarrinhoService {

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private CarrinhoMapper carrinhoMapper;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private AssinaturaRepository assinaturaRepository;

    @Autowired
    private CupomRepository cupomRepository;

    @Autowired
    private EnderecoRepository enderecoRepository;

    @Autowired
    private PrecificacaoAssinaturaResolver precificacaoAssinaturaResolver;

    @Autowired
    private AssinaturaService assinaturaService;

    @Autowired
    private PagamentoMockService pagamentoMockService;


    public CarrinhoDto recuperarCarrinho(Long clienteId)
    {
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
        return carrinhoMapper.toCarrinhoDto(carrinho);
    };

    @Transactional
    public CarrinhoDto adicionarItemCarrinho(Long idUsuarioLogado, ItemCarrinhoCreate request)
    {
        Produto produto = produtoRepository.findById(request.produtoCodigo())
                .orElseThrow(() -> new RuntimeException("Produto nao encontrado"));

        Cliente cliente = clienteRepository.findById(idUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado de verdade"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(idUsuarioLogado)
                .orElseGet(() -> {
                    Carrinho novoCarrinho = new Carrinho();
                    novoCarrinho.setCliente(cliente);
                    novoCarrinho.setItens(new ArrayList<>());
                    return carrinhoRepository.save(novoCarrinho);
                });

        Optional<ItemCarrinho> itemExistente = carrinho.getItens().stream()
                .filter(item -> item.getProduto().getCodigo().equals(request.produtoCodigo()))
                .findFirst();

        if (itemExistente.isPresent()) {
            ItemCarrinho item = itemExistente.get();
            item.setQuantidade(item.getQuantidade() + request.quantidade());
        } else {
            ItemCarrinho novoItem = new ItemCarrinho();
            novoItem.setProduto(produto);
            novoItem.setQuantidade(request.quantidade());
            novoItem.setCarrinho(carrinho);

            carrinho.getItens().add(novoItem);
        }

        Carrinho carrinhoSalvo = carrinhoRepository.save(carrinho);

        return carrinhoMapper.toCarrinhoDto(carrinhoSalvo);
    }

    @Transactional
    public CarrinhoDto adicionarAssinatura(Long idUsuarioLogado, AssinaturaCreate assinaturaCreate)
    {
        assinaturaService.validarClienteSemAssinaturaAtivaRecente(idUsuarioLogado);

        String tipoPlano = assinaturaCreate.getTipoPlano();
        BigDecimal valorPlano = precificacaoAssinaturaResolver.calcularPreco(tipoPlano);

        Cliente cliente = clienteRepository.findById(idUsuarioLogado)
                .orElseThrow(() -> new RuntimeException("Usuario nao encontrado de verdade"));

        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(idUsuarioLogado)
                .orElseGet(() -> {
                    Carrinho novoCarrinho = new Carrinho();
                    novoCarrinho.setCliente(cliente);
                    novoCarrinho.setItens(new ArrayList<>());
                    return carrinhoRepository.save(novoCarrinho);
                });

        carrinho.setTipoPlanoAssinatura(tipoPlano);
        carrinho.setValorAssinatura(valorPlano);
        carrinho.setEstiloArranjoAssinatura(assinaturaCreate.getEstiloArranjo());
        carrinho.setCoresPreferidasAssinatura(assinaturaCreate.getCoresPreferidas());
        carrinho.setObservacaoAssinatura(assinaturaCreate.getObservacao());

        Carrinho carrinhoSalvo = carrinhoRepository.save(carrinho);
        return carrinhoMapper.toCarrinhoDto(carrinhoSalvo);
    }

    @Transactional
    public CarrinhoDto atualizarItem(Long clienteId, Long itemId, Integer novaQuantidade)
    {
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        ItemCarrinho itemCarrinho = carrinho.getItens().stream()
                .filter(i -> i.getId().equals(itemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Produto nao encontrado"));

        itemCarrinho.setQuantidade(novaQuantidade);
        return carrinhoMapper.toCarrinhoDto(carrinho);
    };

    @Transactional
    public CarrinhoDto excluirItemPorId(Long itemId, Long clienteId)
    {
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        carrinho.getItens().removeIf(i -> i.getId().equals(itemId));
        carrinhoRepository.save(carrinho);

        return carrinhoMapper.toCarrinhoDto(carrinho);
    };

    @Transactional
    public void esvaziarCarrinho(Long clienteId){
        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        carrinho.getItens().clear();
        carrinho.setTipoPlanoAssinatura(null);
        carrinho.setValorAssinatura(null);
        carrinho.setEstiloArranjoAssinatura(null);
        carrinho.setCoresPreferidasAssinatura(null);
        carrinho.setObservacaoAssinatura(null);
        carrinhoRepository.save(carrinho);
    };

    @Transactional
    public void finalizarCompra(Long clienteId, FinalizarCompraRequest request){

        Carrinho carrinho = carrinhoRepository.findByUsuarioUsuarioId(clienteId)
                .orElseThrow(() -> new RuntimeException("Carrinho nao encontrado"));

        boolean temItens = carrinho.getItens() != null && !carrinho.getItens().isEmpty();
        boolean temAssinatura = carrinho.getTipoPlanoAssinatura() != null && carrinho.getValorAssinatura() != null;

        if (!temItens && !temAssinatura) {
            throw new RuntimeException("Não é possível finalizar um carrinho vazio");
        }

        if (temAssinatura) {
            assinaturaService.validarClienteSemAssinaturaAtivaRecente(clienteId);
        }

        Assinatura assinatura = null;
        if (temAssinatura) {
            assinatura = new Assinatura();
            assinatura.setUsuario(carrinho.getCliente());
            assinatura.setTipoPlano(carrinho.getTipoPlanoAssinatura());
            assinatura.setStatus("Ativa");
            assinatura.setValorPlano(carrinho.getValorAssinatura());
            assinatura.setDataContratacao(LocalDateTime.now());
            assinatura.setEstiloArranjo(carrinho.getEstiloArranjoAssinatura());
            assinatura.setCoresPreferidas(carrinho.getCoresPreferidasAssinatura());
            assinatura.setObservacao(carrinho.getObservacaoAssinatura());
            assinatura = assinaturaRepository.save(assinatura);
        }

        Pedido pedido = new Pedido();
        pedido.setUsuario(carrinho.getCliente());
        pedido.setData(java.time.LocalDateTime.now());
        pedido.setItens(new ArrayList<>());
        Endereco enderecoEntrega = recuperarEnderecoEntrega(clienteId, request);
        pedido.setIdEnderecoEntrega(enderecoEntrega.getId());
        pedido.setEnderecoEntrega(formatarEndereco(enderecoEntrega));

        BigDecimal valorProdutos = temItens
                ? carrinho.getItens().stream()
                    .map(item -> item.getProduto().getPreco().multiply(BigDecimal.valueOf(item.getQuantidade())))
                    .reduce(BigDecimal.ZERO, BigDecimal::add)
                : BigDecimal.ZERO;
        BigDecimal valorTotal = valorProdutos.add(temAssinatura ? carrinho.getValorAssinatura() : BigDecimal.ZERO);
        Cupom cupomAplicado = recuperarCupomValido(request);

        if (cupomAplicado != null) {
            BigDecimal valorDesconto = valorTotal
                    .multiply(cupomAplicado.getDesconto())
                    .setScale(2, RoundingMode.HALF_UP);

            valorTotal = valorTotal.subtract(valorDesconto);
            if (valorTotal.compareTo(BigDecimal.ZERO) < 0) {
                valorTotal = BigDecimal.ZERO;
            }

            pedido.setNomeCupom(cupomAplicado.getNomeCupom());
            pedido.setDescontoCupom(valorDesconto);
            cupomAplicado.setLimiteDeUso(cupomAplicado.getLimiteDeUso() - 1);
            cupomRepository.save(cupomAplicado);
        }

        pedido.setValorTotal(valorTotal);

        if (temAssinatura) {
            pedido.setOrigem(temItens ? "MISTA" : "ASSINATURA");
            pedido.setDescricao("Assinatura " + carrinho.getTipoPlanoAssinatura());
            pedido.setIdAssinatura(assinatura.getIdAssinatura());
            pedido.setEstiloAssinatura(carrinho.getEstiloArranjoAssinatura());
            pedido.setCoresAssinatura(carrinho.getCoresPreferidasAssinatura());
            pedido.setObservacaoAssinatura(carrinho.getObservacaoAssinatura());
        }

        if (temItens) {
            for (ItemCarrinho itemCarrinho : carrinho.getItens()) {
                ItemPedido novoItemPedido = new ItemPedido();
                novoItemPedido.setPedido(pedido);
                novoItemPedido.setProduto(itemCarrinho.getProduto());
                novoItemPedido.setQuantidade(itemCarrinho.getQuantidade());
                novoItemPedido.setPrecoUnitario(itemCarrinho.getProduto().getPreco());

                itemCarrinho.getProduto().setQuantidade(itemCarrinho.getProduto().getQuantidade() - itemCarrinho.getQuantidade());

                pedido.getItens().add(novoItemPedido);
            }
        }

        pagamentoMockService.iniciarPagamento(pedido);
        Pedido pedidoSalvo = pedidoRepository.save(pedido);
        pagamentoMockService.aprovarPagamento(pedidoSalvo);
        pedidoSalvo = pedidoRepository.save(pedidoSalvo);

        if (assinatura != null) {
            assinatura.setIdPedido(pedidoSalvo.getId());
            assinaturaRepository.save(assinatura);
        }

        carrinho.getItens().clear();
        carrinho.setTipoPlanoAssinatura(null);
        carrinho.setValorAssinatura(null);
        carrinho.setEstiloArranjoAssinatura(null);
        carrinho.setCoresPreferidasAssinatura(null);
        carrinho.setObservacaoAssinatura(null);
        carrinhoRepository.save(carrinho);
    }

    private Cupom recuperarCupomValido(FinalizarCompraRequest request) {
        if (request == null || request.nomeCupom() == null || request.nomeCupom().isBlank()) {
            return null;
        }

        String nomeCupom = request.nomeCupom().trim();
        if (!CupomSeed.CUPOM_PRIMEIRA_COMPRA.equalsIgnoreCase(nomeCupom)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cupom não encontrado");
        }

        Cupom cupom = cupomRepository.findByNomeCupomIgnoreCase(nomeCupom)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cupom não encontrado"));

        LocalDate hoje = LocalDate.now();
        if (cupom.getDataInicio() != null && cupom.getDataInicio().isAfter(hoje)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cupom ainda não está vigente");
        }

        if (cupom.getDataFim() != null && cupom.getDataFim().isBefore(hoje)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cupom expirado");
        }

        if (cupom.getLimiteDeUso() == null || cupom.getLimiteDeUso() <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cupom sem usos disponíveis");
        }

        if (cupom.getDesconto() == null || cupom.getDesconto().compareTo(BigDecimal.ZERO) <= 0) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cupom sem desconto válido");
        }

        return cupom;
    }

    private Endereco recuperarEnderecoEntrega(Long clienteId, FinalizarCompraRequest request) {
        if (request == null || request.idEndereco() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Informe um endereço de entrega");
        }

        Endereco endereco = enderecoRepository.findById(request.idEndereco())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Endereço de entrega não encontrado"));

        if (endereco.getCliente() == null || !endereco.getCliente().getUsuarioId().equals(clienteId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Endereço de entrega não pertence ao cliente autenticado");
        }

        return endereco;
    }

    private String formatarEndereco(Endereco endereco) {
        String complemento = endereco.getComplemento() == null || endereco.getComplemento().isBlank()
                ? ""
                : ", " + endereco.getComplemento().trim();

        return String.format(
                "%s, %s%s - %s, %s/%s - CEP %s",
                endereco.getRua(),
                endereco.getNumero(),
                complemento,
                endereco.getBairro(),
                endereco.getCidade(),
                endereco.getUf(),
                endereco.getCep()
        );
    }

}
