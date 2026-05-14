package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.GoogleAuthRequest;
import br.com.prpp.tudosaoflores.dto.AuthResponse;
import br.com.prpp.tudosaoflores.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleLogin(@RequestBody GoogleAuthRequest request) {
        AuthResponse response = authService.autenticarOuRegistrar(request);
        return ResponseEntity.ok(response);
    }

}