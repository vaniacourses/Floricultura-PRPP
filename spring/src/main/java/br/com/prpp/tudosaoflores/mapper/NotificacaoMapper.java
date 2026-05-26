package br.com.prpp.tudosaoflores.mapper;

import br.com.prpp.tudosaoflores.dto.NotificacaoDto;
import br.com.prpp.tudosaoflores.model.Notificacao;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class NotificacaoMapper {


    public NotificacaoDto toDTO(Notificacao notificacao) {
        if (notificacao == null) {
            return null;
        }

        NotificacaoDto dto = new NotificacaoDto();
        dto.setIdNotificacao(notificacao.getIdNotificacao());
        dto.setMensagem(notificacao.getMensagem());
        dto.setLida(notificacao.isLida());
        dto.setDataEnvio(notificacao.getDataEnvio());

        return dto;
    }


    public List<NotificacaoDto> toDTOList(List<Notificacao> notificacoes) {
        return notificacoes.stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }
}