package br.com.prpp.tudosaoflores.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDateTime;
import java.util.List;

public record ReservaCreate(
        @NotNull String tipoEvento,
        @NotNull String localEvento,
        @NotNull @FutureOrPresent LocalDateTime dataEvento,
        @NotNull @FutureOrPresent LocalDateTime dataReserva,
        @NotNull String finalidade,
        String observacao,
        @NotEmpty List<@Valid ItemPedidoCreate> itens
) {
}
