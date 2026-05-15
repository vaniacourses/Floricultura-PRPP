package br.com.prpp.tudosaoflores.model;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;
import lombok.*;


@Getter
@Setter
@NoArgsConstructor
@Entity
@ToString
public class Administrador extends Usuario {
    
    @Enumerated(EnumType.STRING)
    @Column(name = "nivel_de_acesso")
    private NivelAcesso nivelAcesso;

    @Column(name = "firebase_uid", unique = true)
    private String firebaseUid;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "created_at")
    private LocalDate createdAt;

    public Administrador(String nome, String telefone, String email, NivelAcesso nivelAcesso, String firebaseUid){
        super(nome, telefone, email);
        this.nivelAcesso = nivelAcesso;
        this.firebaseUid = firebaseUid;
        this.createdAt = LocalDate.now();
    }

}


