package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.dto.DashboardDto;
import br.com.prpp.tudosaoflores.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/hoje")
    public ResponseEntity<DashboardDto> getDashboardHoje() {
        return ResponseEntity.ok(dashboardService.getDashboardHoje());
    }
}