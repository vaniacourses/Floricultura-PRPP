package br.com.prpp.tudosaoflores.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;

    public SecurityConfig(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            .csrf(csrf -> csrf.disable())
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .requestMatchers("/produtos/**", "/cupons/**","/auth/**", "/avaliacoes/**", "/error").permitAll() 
                .requestMatchers("/api/favoritos/**", "/api/notificacoes/**").permitAll()

                .requestMatchers("/administrador/me").hasAnyRole("GERENTE", "SUPER_ADMIN")
                .requestMatchers("/administrador").hasRole("SUPER_ADMIN")
                .requestMatchers("/administrador/{id}").hasRole("SUPER_ADMIN")
                .requestMatchers("/pedidos/admin/historico").hasAnyRole("GERENTE", "SUPER_ADMIN")                .requestMatchers("/relatorios", "/dashboard").hasAnyRole("GERENTE", "SUPER_ADMIN")
                .requestMatchers(HttpMethod.GET, "/pedidos/reservas/solicitadas").hasAnyRole("GERENTE", "SUPER_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/pedidos/reserva/{idPedido}/confirmar").hasAnyRole("GERENTE", "SUPER_ADMIN")
                .requestMatchers(HttpMethod.PUT, "/pedidos/reserva/{idPedido}/recusar").hasAnyRole("GERENTE", "SUPER_ADMIN")
                .requestMatchers("/carrinho/**").hasRole("CLIENTE")
                .requestMatchers("/pedidos/**").hasRole("CLIENTE")
                .requestMatchers(HttpMethod.POST, "/assinaturas", "/assinaturas/comprar").hasRole("CLIENTE")
                .requestMatchers(HttpMethod.GET, "/assinaturas/minha").hasRole("CLIENTE")
                .requestMatchers(HttpMethod.PUT, "/assinaturas/{id}/plano").hasRole("CLIENTE")
                .requestMatchers(HttpMethod.DELETE, "/assinaturas/{id}").hasRole("CLIENTE")
                
                .anyRequest().authenticated()
            )
            .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter(jwtUtil);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
