package br.com.prpp.tudosaoflores.config;

import br.com.prpp.tudosaoflores.model.Administrador;
import br.com.prpp.tudosaoflores.model.NivelAcesso;
import br.com.prpp.tudosaoflores.repository.AdministradorRespository;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class AdminSeed implements CommandLineRunner {

    @Autowired
    private AdministradorRespository administradorRespository;

    @Override
    public void run(String... args) {
        String[][] admins = {
            {"Luiza Canto Furley Schmidt", "lufurley@id.uff.br", "SUPER_ADMIN"},
            {"Isabella Direito Labre Martins", "isamartins@id.uff.br", "SUPER_ADMIN"},
            {"Juliana Alves Poustka", "julianapoustka@id.uff.br", "SUPER_ADMIN"},
            {"Amanda Lemos Ribas", "amandaribas@id.uff.br", "SUPER_ADMIN"},
            {"Maria Eduarda D'Angelo Quitete Vianna", "me_vianna@id.uff.br", "SUPER_ADMIN"},
            {"Lais Ferreira Nazareth", "laisfn@id.uff.br", "SUPER_ADMIN"},
           
        };

        for (String[] adminData : admins) {
            String nome = adminData[0];
            String email = adminData[1];
            NivelAcesso nivel = NivelAcesso.valueOf(adminData[2]);

            if (administradorRespository.findByEmail(email).isEmpty()) {
                Administrador admin = new Administrador();
                admin.setNome(nome);
                admin.setTelefone(""); 
                admin.setEmail(email);
                admin.setNivelAcesso(nivel);
                admin.setFirebaseUid(null);
                admin.setCreatedAt(LocalDate.now());
                administradorRespository.save(admin);
            }
        }
    }
}