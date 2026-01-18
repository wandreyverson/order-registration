# Order Registration – Frontend

Aplicação **Angular (SPA)** para gerenciamento de pedidos de clientes.
Este frontend consome uma **API Node.js** para autenticação e persistência de dados, permitindo **login**, **criação**, **listagem**, **filtro** e **atualização de pedidos**.

---

## ✨ Funcionalidades

* **Autenticação de Usuário**

  * Tela de login integrada à API
  * Token JWT armazenado no `localStorage`
* **Dashboard de Pedidos**

  * Listagem completa de pedidos
  * Exibição de ID, cliente, itens, valor total, status e data de criação
* **Criação de Novos Pedidos**

  * Modal para cadastro de pedidos
  * Inclusão dinâmica de produtos (nome, quantidade e preço)
* **Atualização de Status**

  * Alteração do status do pedido (ex: `PENDENTE` → `ENTREGUE`)
* **Filtro por Status**

  * Filtro da listagem por status do pedido

---

## 🛠️ Stack Tecnológica

* **Framework**: Angular
* **Linguagem**: TypeScript
* **Comunicação HTTP**: Angular `HttpClient`
* **Roteamento**: Angular Router
* **Gerenciamento de Estado Simples**: Services + localStorage

---

## 📋 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter:

* **Node.js** (versão 16 ou superior)
* **npm**
* **Angular CLI**
* **Backend rodando localmente**

### Backend esperado

A aplicação espera que a API esteja disponível em:

http://localhost:3000

Endpoints utilizados:

* Autenticação:

  ```
  POST /api/auth/login
  ```
* Pedidos:

  ```
  GET    /api/orders
  POST   /api/orders
  PATCH  /api/orders/:id/status
  ```

> ⚠️ O frontend **não funciona sem o backend** configurado corretamente.

---

## 🚀 Como rodar o projeto

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/wandreyverson/order-registration.git
cd order-registration
```

### 2️⃣ Instalar dependências

```bash
npm install
```

---

## ▶️ Servidor de desenvolvimento

Para iniciar o projeto em modo de desenvolvimento:

```bash
npm start
```

ou

```bash
ng serve
```

A aplicação ficará disponível em:

```
http://localhost:4200
```

O navegador será atualizado automaticamente a cada alteração no código.

---

## 📦 Scripts disponíveis

| Comando         | Descrição                                  |
| --------------- | ------------------------------------------ |
| `npm start`     | Inicia a aplicação em modo desenvolvimento |
| `npm run build` | Gera o build de produção na pasta `dist/`  |
| `npm test`      | Executa os testes unitários com Vitest     |

---

## 🔐 Autenticação

* O token JWT retornado pela API é salvo no `localStorage`
* As requisições HTTP utilizam o header:

  ```
  Authorization: Bearer <token>
  ```
* Caso o token seja inválido ou expirado, a API retorna **401 (Unauthorized)** e o frontend exibe uma mensagem amigável