package br.com.prpp.tudosaoflores.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

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
    private List<HistoricoAssinaturaDto> historico;

    @Data
    public static class HistoricoAssinaturaDto {
        private Long id;
        private String planoAnterior;
        private String planoNovo;
        private BigDecimal valorAnterior;
        private BigDecimal valorNovo;
        private LocalDateTime dataTroca;
    }
}
