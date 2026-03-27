# 📦 Stock Control 

Sistema completo de controle de estoque desenvolvido utilizando Angular no frontend e Node.js com Prisma no backend.

---

## 🚀 Sobre o projeto

Aplicação web para gerenciamento de estoque, permitindo o controle de produtos, categorias e vendas de forma prática e eficiente.

O sistema conta com autenticação de usuários, dashboard com gráficos e controle em tempo real das movimentações.

---

## 🎯 Funcionalidades

* 🔐 Autenticação de usuários (Login e Cadastro)
* 📦 CRUD completo de produtos
* 📂 Gerenciamento de categorias
* 💰 Registro de vendas
* 📊 Dashboard com gráficos dinâmicos
* 🔒 Rotas protegidas com JWT
* 📉 Controle automático de estoque

---

## 🛠️ Tecnologias utilizadas

### 💻 Frontend

* Angular
* TypeScript
* PrimeNG
* PrimeFlex
* RxJS

### ⚙️ Backend

* Node.js
* Express
* Prisma ORM
* JWT (Autenticação)

---

## 🧱 Arquitetura do projeto

```bash
stock-control/
 ├── src/                # Frontend Angular
 ├── projects/API/       # Backend Node.js + Prisma
 ├── angular.json
 └── package.json
```

---

## ▶️ Como rodar o projeto

### 🔹 Backend

```bash
cd projects/API
npm install
npm run dev
```

Servidor rodando em:
👉 http://localhost:3000

---

### 🔹 Frontend

```bash
npm install
ng serve --open
```

Aplicação disponível em:
👉 http://localhost:4200

---

## 🔐 Autenticação

O sistema utiliza JWT (JSON Web Token):

* Token gerado no login
* Armazenado no navegador
* Proteção de rotas no frontend e backend


---


## 👨‍💻 Autor

Desenvolvido por **Caio Oliveira**

🔗 LinkedIn:
https://www.linkedin.com/in/caio-oliveira-749173135/

💻 GitHub:
https://github.com/caquitooliveira

---

## ⭐ Diferencial do projeto

Este projeto demonstra conhecimentos em:

* Desenvolvimento Full Stack
* Integração entre frontend e backend
* Autenticação segura com JWT
* Organização de código e arquitetura
* Criação de dashboards interativos
