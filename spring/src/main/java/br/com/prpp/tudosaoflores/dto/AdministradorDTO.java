package br.com.prpp.tudosaoflores.dto;

import java.time.LocalDate;

import br.com.prpp.tudosaoflores.model.NivelAcesso;

public record AdministradorDTO(

    Long usuarioId,
    String nome,
    String telefone,
    String email,
    NivelAcesso nivelAcesso,
    LocalDate createdAt
 
){}
