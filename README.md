# 🚗 Car Deal Platform – Private Auction System

![Java](https://img.shields.io/badge/Backend-Java%2021-blue)
![Angular](https://img.shields.io/badge/Frontend-Angular%2019-red)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue)
![Status](https://img.shields.io/badge/Status-Em%20Desenvolvimento-yellow)


Aplicação full-stack construída com **Angular + TypeScript** no frontend e **Java + Spring Boot** no backend.  
Essa plataforma simula um marketplace privado de carros, onde usuários podem anunciar veículos e receber ofertas de outros usuários.

---

## 🖼️ Preview da Interface

Abaixo está uma prévia da tela principal da aplicação (homepage).  
Essa tela é pública e exibe os anúncios de carros disponíveis.

<p align="center">
  <img src="https://raw.githubusercontent.com/404GabrielDev/Projeto-Marketplace-de-Carros/frontend/docs/Screenshot1.png" alt="Screenshot da Homepage" width="800">
</p>

## 📌 Features

### 👤 Usuários gerais
- Visualizar todos os carros anunciados
- Ver detalhes e imagens dos carros
- Fazer propostas de compra

### 🚘 Donos dos anúncios
- Criar e gerenciar anúncios de carros
- Receber, aceitar ou recusar ofertas
- Editar detalhes da oferta (ex: valor proposto)
- Acompanhar propostas em um dashboard privado

⚠️ O projeto está funcional, com novas funcionalidades e melhorias sendo implementadas continuamente.

---

## 🛠️ Tech Stack

### Backend
- **Java 21 + Spring Boot**
- **Autenticação JWT**
- **MySQL** (banco de dados relacional)
- APIs RESTful

### Frontend
- **Angular + TypeScript**
- **NgZorro UI Library**
- Componentes standalone

---

## 📂 Estrutura do Repositório

main-branch/
├── frontend/    → Aplicação Angular (TypeScript + NgZorro)

├── backend/     → Aplicação Spring Boot (Java)

└── README.md    → Documentação do projeto



> 🧠 **Observação:** Todo o projeto foi desenvolvido utilizando o idioma **inglês no código**, tanto no frontend quanto no backend.  
> Isso foi feito de forma intencional, pois estou aprendendo inglês e já estou me acostumando com a leitura de documentações, código internacional e boas práticas.

---

## 🧠 Sobre o Projeto

Sistema com foco em propostas, onde usuários autenticados podem anunciar carros, fazer ofertas e gerenciar negociações com controle de acesso por permissões.

> ⚠️ **Nota sobre o armazenamento de imagens:**  
> Atualmente, as imagens dos carros são armazenadas diretamente no banco de dados relacional (MySQL).  
> Embora funcione para o projeto, essa não é a melhor prática para performance e escalabilidade.  
> O ideal seria usar um serviço de armazenamento na nuvem, como AWS S3 ou similar.  
> Por enquanto, devido a limitações, essa solução foi adotada, mas planejo migrar no futuro.

> ⚠️ **Atenção sobre limite de upload:**  
> Se ocorrer erro de tamanho de arquivo excedido no Spring Boot, ajuste o `application.properties` com:  
> ```properties
> spring.servlet.multipart.max-file-size=15MB
> spring.servlet.multipart.max-request-size=15MB
> ```  
> Isso permite aceitar uploads maiores e evita falhas no envio das imagens.
---

## 🔧 Melhorias Futuras

- ✅ Implementar status visuais (ex: "Notificações", "Melhoria no UI/UX")
- 🔄 Filtros e ordenação de ofertas
- 🖼️ Galeria de imagens mais completa
- ✉️ Notificações por e-mail ao aceitar/recusar propostas
- 🧪 Adição de testes unitários e documentação com Swagger

---

## 🎯 Objetivos de Aprendizado

Este projeto me ajudou a evoluir em:
- Estruturar uma aplicação full-stack
- Utilizar Angular Standalone com NgZorro
- Criar APIs seguras com JWT e Spring Boot

---

## 🚀 Como Rodar o Projeto

<details>
  <summary><strong>Frontend</strong></summary>

  1. Navegue até `frontend/sellcar_angular/sellcar_angular`
  2. Execute `npm install`
  4. Rode com `ng serve`

</details>

<details>
  <summary><strong>Backend</strong></summary>

  1. Navegue até `backend/`
  2. Configure o `application.properties` com seu MySQL
  3. Rode a aplicação Spring Boot

</details>

---

### Opção 2

### Rodar via Docker (com Docker Compose)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
Para facilitar a execução do projeto completo (frontend, backend e banco de dados MySQL), você pode utilizar o arquivo docker-compose.yml que está disponível neste repositório.

Com o Docker e Docker Compose instalados, basta executar o comando:
```bash
docker compose up --build
```

Esse comando irá:

* Construir as imagens do frontend Angular e backend Java Spring Boot

* Criar e iniciar os containers necessários (frontend, backend e banco MySQL)

* Configurar a rede entre os containers para que o sistema funcione integrado

---

## 📬 Contato

Fique à vontade para entrar em contato:  
**João Gabriel** – Desenvolvedor Full Stack  
[LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-gabriel-s-b22407365/)

Email: joaogabriell.ssm@gmail.com

---
