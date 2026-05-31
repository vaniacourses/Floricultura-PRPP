package br.com.prpp.tudosaoflores.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class AssinaturaDto {
    private String idAssinatura;
    private Long idUsuario;
    private String tipoPlano;
    private String status;
    private BigDecimal valorPlano;
    private LocalDateTime dataContratacao;
    private Long idPedido;
    private String estiloArranjo;
    private String coresPreferidas;
    private String observacao;
}
