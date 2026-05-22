package br.com.prpp.tudosaoflores.dto;

import br.com.prpp.tudosaoflores.model.NivelAcesso;

public record AdministradorCreate (
    String nome,
    String email,
    String telefone,
    NivelAcesso nivelAcesso
){}
