package br.com.prpp.tudosaoflores.model;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name = "cliente")
public abstract class Cliente extends Usuario {

    @Column(name = "google_id")
    private String googleId;

    public Cliente() {
        super();
    }

    public Cliente(String nome, String telefone, String email, String googleId) {
        super(nome, telefone, email);
        this.googleId = googleId;
    }

    public String getGoogleId() { return googleId; }
    public void setGoogleId(String googleId) { this.googleId = googleId; }
}