package br.com.prpp.tudosaoflores.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class NotificacaoDto {
    private Long idNotificacao;
    private String mensagem;
    private boolean lida;
    private LocalDateTime dataEnvio;
}