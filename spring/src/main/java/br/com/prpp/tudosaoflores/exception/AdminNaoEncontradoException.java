package br.com.prpp.tudosaoflores.exception;

public class AdminNaoEncontradoException extends RuntimeException {

    public AdminNaoEncontradoException(String mensagem) {
        super(mensagem);
    }
}