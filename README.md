# 📦 Sistema de Controle de Estoque

![Angular](https://img.shields.io/badge/Angular-15-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18-339933?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![PrimeNG](https://img.shields.io/badge/PrimeNG-15-007ad9?style=for-the-badge&logo=primeng&logoColor=white)


Aplicação de controle de estoque desenvolvida com **Angular (frontend)** e **Node.js + Express + Prisma (backend)**.  
Permite gerenciar produtos, categorias e vendas, com dashboard em tempo real mostrando gráficos de desempenho.

---

## 🚀 Funcionalidades Principais

- 🔐 Autenticação de usuários (login e cadastro)  
- 📦 Cadastro, edição e exclusão de produtos  
- 💰 Registro de vendas e controle de estoque  
- 📊 Dashboard com gráficos dinâmicos por produto/categoria  
- 📂 Gerenciamento de categorias  
- 🔒 Rotas protegidas com JWT  

---

## 🛠 Tecnologias Utilizadas

### Frontend
- Angular 15  
- TypeScript  
- PrimeNG & PrimeFlex   
- RxJS   

### Backend
- Node.js + Express  
- Prisma ORM  
- JWT (autenticação)  
 

---

## ⚙️ Como Rodar o Projeto

### Backend

```bash
cd stock-api
yarn install
yarn dev

Servidor rodando em:

http://localhost:3000
Frontend
cd stock-control
npm install
ng s --o

Aplicação aberta em:

http://localhost:4200
🔐 Autenticação
Sistema protegido com JWT
Token é salvo no navegador após login
Token é enviado automaticamente nas requisições protegidas
📌 Melhorias Futuras
Dashboard com métricas avançadas
Sistema de permissões (admin/user)
Upload de imagens de produtos
Otimizações de performance no frontend e backend
👨‍💻 Autor

Caio Oliveira
