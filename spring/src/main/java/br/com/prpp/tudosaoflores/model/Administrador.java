package br.com.prpp.tudosaoflores.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;



@Entity
@Table(name = "administrador")
public class Administrador extends Usuario {

    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_de_acesso")
    private NivelAcesso nivelAcesso;

    @Column(name = "firebase_uid", unique = true)
    private String firebaseUid;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "created_at")
    private LocalDate createdAt;

    public Administrador(String nome, String telefone, String email, NivelAcesso nivelAcesso, String firebaseUid) {
        super(nome, telefone, email);
        this.nivelAcesso = nivelAcesso;
        this.firebaseUid = firebaseUid;
        this.createdAt = LocalDate.now();
    }

    public Administrador(){}

    public NivelAcesso getNivelAcesso() {
        return nivelAcesso;
    }

    public void setNivelAcesso(NivelAcesso nivelAcesso) {
        this.nivelAcesso = nivelAcesso;
    }

    public String getFirebaseUid() {
        return firebaseUid;
    }

    public void setFirebaseUid(String firebaseUid) {
        this.firebaseUid = firebaseUid;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }
}
