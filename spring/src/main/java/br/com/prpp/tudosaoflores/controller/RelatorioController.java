package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.RelatorioDTO;
import br.com.prpp.tudosaoflores.service.RelatorioService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    private final RelatorioService relatorioService;

    public RelatorioController(RelatorioService relatorioService) {
        this.relatorioService = relatorioService;
    }

    @GetMapping
    public ResponseEntity<RelatorioDTO> gerarRelatorio(
            @RequestParam(defaultValue = "mes") String periodo) {
        RelatorioDTO relatorio = relatorioService.gerarRelatorio(periodo);
        return ResponseEntity.ok(relatorio);
    }
}