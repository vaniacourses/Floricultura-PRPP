package br.com.prpp.tudosaoflores.exception;

public class EntidadeNaoEncontradaException extends RuntimeException {
    public EntidadeNaoEncontradaException(String msg) {
        super(msg);
    }
}