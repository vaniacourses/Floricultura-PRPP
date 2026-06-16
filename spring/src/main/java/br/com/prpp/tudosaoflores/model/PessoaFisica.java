package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@PrimaryKeyJoinColumn(name = "usuario_id")
public class PessoaFisica extends Cliente {

    private String cpf;
    private LocalDate dataNascimento;

    public PessoaFisica() {
        super();
    }

    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }

    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }

}