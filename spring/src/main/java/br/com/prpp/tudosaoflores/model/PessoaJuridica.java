package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;

@Entity
@PrimaryKeyJoinColumn(name = "usuario_id")
public class PessoaJuridica extends Cliente {

    private String razaoSocial;
    private String cnpj;

    public PessoaJuridica() {
        super();
    }

    public String getRazaoSocial() { return razaoSocial; }
    public void setRazaoSocial(String razaoSocial) { this.razaoSocial = razaoSocial; }

    public String getCnpj() { return cnpj; }
    public void setCnpj(String cnpj) { this.cnpj = cnpj; }
}