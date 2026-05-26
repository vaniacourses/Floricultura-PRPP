package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.NotificacaoDto;
import br.com.prpp.tudosaoflores.mapper.NotificacaoMapper;
import br.com.prpp.tudosaoflores.model.Notificacao;
import br.com.prpp.tudosaoflores.repository.NotificacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/notificacoes")
@CrossOrigin("*")
public class NotificacaoController {

    @Autowired
    private NotificacaoRepository notificacaoRepository;

    @Autowired
    private NotificacaoMapper notificacaoMapper;


    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<NotificacaoDto>> listarNotificacoesDoUsuario(@PathVariable Long usuarioId) {

        List<Notificacao> notificacoes = notificacaoRepository.findByClienteUsuarioIdAndLidaFalseOrderByDataEnvioDesc(usuarioId);


        List<NotificacaoDto> notificacoesDto = notificacaoMapper.toDTOList(notificacoes);

        return ResponseEntity.ok(notificacoesDto);
    }

    @GetMapping("/usuario/{usuarioId}/nao-lidas/count")
    public ResponseEntity<Long> contarNaoLidas(@PathVariable Long usuarioId) {
        long totalNaoLidas = notificacaoRepository.countByClienteUsuarioIdAndLidaFalse(usuarioId);
        return ResponseEntity.ok(totalNaoLidas);
    }


    @PutMapping("/{idNotificacao}/ler")
    public ResponseEntity<String> marcarComoLida(@PathVariable Long idNotificacao) {
        Notificacao notificacao = notificacaoRepository.findById(idNotificacao)
                .orElseThrow(() -> new RuntimeException("Notificação não encontrada"));

        notificacao.setLida(true);
        notificacaoRepository.save(notificacao);

        return ResponseEntity.ok("Notificação marcada como lida.");
    }
}