package br.com.prpp.tudosaoflores;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.security.autoconfigure.SecurityAutoConfiguration;

// @SpringBootApplication
@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class BackendApplication {
    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }


}
