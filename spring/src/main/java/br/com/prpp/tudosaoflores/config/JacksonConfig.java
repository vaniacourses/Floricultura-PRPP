package br.com.prpp.tudosaoflores.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JacksonConfig {

    @Bean
    public ObjectMapper objectMapper() {
        ObjectMapper mapper = new ObjectMapper();
        // Jackson conseguir ler campos de LocalDate/LocalDateTime(validade das flores)
        mapper.registerModule(new JavaTimeModule());
        return mapper;
    }
}