package br.com.prpp.tudosaoflores.controller;

import br.com.prpp.tudosaoflores.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

}
