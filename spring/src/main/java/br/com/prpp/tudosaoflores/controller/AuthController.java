package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.GoogleAuthRequest;
import br.com.prpp.tudosaoflores.dto.AuthResponse;
import br.com.prpp.tudosaoflores.service.AuthService;
import br.com.prpp.tudosaoflores.service.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private AdministradorService administradorService;

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(authService.autenticar(request));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(authService.registrar(request));
    }

    @PostMapping("/admin/google")
    public ResponseEntity<AuthResponse> adminGoogleLogin(@RequestBody GoogleAuthRequest request) {
        return ResponseEntity.ok(administradorService.autenticarComGoogle(request));
    }
}