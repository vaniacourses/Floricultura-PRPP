# Floricultura-PRPP - Tudo São Flores 

**Tudo São Flores** é um site de floricultura que permite a compra de produtos, contratação de assinaturas recorrentes, solicitação de reservas para eventos e gerenciamento administrativo das operações da loja.

O projeto foi desenvolvido aplicando conceitos de Arquitetura de Software, Projeto Orientado a Objetos, princípios SOLID, padrões GRASP e padrões GoF estudados na disciplina Projeto de Software.

## Tecnologias Utilizadas

### Backend

* Java
* Spring Boot
* MySQL

### Frontend

* React
* TypeScript
* Tailwind CSS

## Documentação

A pasta diagrama contém os diagramas antes da apresentação.

Enquanto a pasta Entrega1-final representa os diagramas após a alteração, levando em conta o feedback dando em sala de aula.

Link da versão da documentação após o feedback da apresentação 1: https://docs.google.com/document/d/1Uk786STPgARlzWe3pTojDfbXTyNrQ7pZmwkSGE29ee0/edit?usp=sharing

Link da documentação para apresentação final: https://docs.google.com/document/d/1TUQZ8ianEmYKe-mIzdHE4jjZgYakTxgYc1dy2klTsMY/edit?usp=sharing

Link dos slides (resumo da documentação): https://canva.link/eeql5q7ckd8zcpv

## Integrantes

* Amanda Lemos
* Isabella Direito
* Juliana Alves
* Lais Nazareth
* Luiza Furley
* Maria Eduarda Vianna

## Execução

Para acessar administrador -> entrar com o email id/ic.uff.br

### Banco de dados (Mysql)

Atualizar password em:
spring\src\main\resources\application.properties
spring\out\production\tudo-sao-flores\application.properties

```bash
CREATE DATABASE prpp;
USE prpp;
```
### Backend

```bash
cd spring
.\mvnw.cmd spring-boot:run
```

### Frontend

```bash
cd react
npm install
npm run dev
```

