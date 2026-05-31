package br.com.prpp.tudosaoflores.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AssinaturaCreate {
    @NotBlank(message = "O tipo do plano é obrigatório")
    private String tipoPlano;
    private String estiloArranjo;
    private String coresPreferidas;
    private String observacao;

    public AssinaturaCreate(String tipoPlano) {
        this.tipoPlano = tipoPlano;
    }
}
