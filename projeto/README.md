# 🍕 FoodExpress UI

Sistema de gerenciamento para restaurantes desenvolvido com Next.js, TypeScript e SCSS. Interface administrativa para controle de pedidos, categorias e produtos.

## 📋 Características

- **Autenticação JWT**: Sistema seguro de login/logout com gerenciamento de tokens
- **Dashboard de Pedidos**: Visualização e controle de pedidos em tempo real
- **Gestão de Categorias**: Cadastro e organização de categorias de produtos
- **Gestão de Produtos**: Cadastro de produtos com upload de imagens
- **Interface Responsiva**: Design moderno e responsivo com SCSS
- **Notificações**: Sistema de feedback visual com toasts
- **SSR/SSG**: Renderização otimizada com Next.js

## 🚀 Tecnologias

- **Frontend**: Next.js 14.1.3, React 18, TypeScript
- **Estilização**: SCSS/Sass
- **Autenticação**: JWT com cookies seguros
- **HTTP Client**: Axios
- **Ícones**: React Icons
- **Notificações**: React Toastify
- **Modais**: React Modal
- **Cookies**: Nookies

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── Header/              # Cabeçalho da aplicação
│   ├── ModalOrder/          # Modal de detalhes do pedido
│   └── ui/
│       ├── Button/          # Componente de botão reutilizável
│       └── Input/           # Componente de input reutilizável
├── contexts/
│   └── AuthContext.tsx     # Contexto de autenticação
├── pages/
│   ├── category/           # Página de cadastro de categorias
│   ├── dashboard/          # Dashboard principal
│   ├── product/            # Página de cadastro de produtos
│   └── signup/             # Página de cadastro de usuários
├── services/
│   ├── api.ts              # Configuração da API
│   ├── apiClient.ts        # Cliente HTTP
│   └── errors/             # Tratamento de erros
├── styles/                 # Estilos globais
└── utils/                  # Utilitários (SSR Auth)
```

## 🛠️ Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/mrjonas151/Foodexpress-ui
cd projeto
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as variáveis de ambiente**
```bash
NEXT_PUBLIC_API_URL=http://localhost:3333
```

4. **Execute o projeto**
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 📋 Scripts Disponíveis

```bash
npm run dev      # Inicia o servidor de desenvolvimento
npm run build    # Gera o build de produção
npm run start    # Inicia o servidor de produção
npm run lint     # Executa o linter
```

## 🔐 Funcionalidades de Autenticação

- **Login**: Autenticação com email e senha
- **Cadastro**: Registro de novos usuários
- **Logout**: Encerramento seguro da sessão
- **Proteção de Rotas**: SSR para páginas autenticadas e não autenticadas
- **Renovação de Token**: Interceptação automática de requisições

## 📊 Funcionalidades Principais

### Dashboard
- Listagem de pedidos em tempo real
- Visualização de detalhes dos pedidos
- Controle de status dos pedidos
- Atualização manual da lista

### Gestão de Categorias
- Cadastro de novas categorias
- Validação de campos obrigatórios
- Feedback visual de operações

### Gestão de Produtos
- Cadastro de produtos com imagem
- Seleção de categoria
- Upload de imagens
- Campos: nome, preço, descrição

## 🌐 API Integration

O frontend se comunica com uma API REST rodando em `http://localhost:3333` com os seguintes endpoints:

- `POST /session` - Autenticação
- `POST /users` - Cadastro de usuários
- `GET /orders` - Listagem de pedidos
- `POST /category` - Cadastro de categorias
- `POST /product` - Cadastro de produtos

## 🎨 Componentes Reutilizáveis

### Button
Componente de botão padronizado com loading state e variações de estilo.

### Input
Componente de input com estilos consistentes e integração com formulários.

### Header
Cabeçalho com navegação e opções de usuário.

### ModalOrder
Modal para exibição detalhada de pedidos com produtos e quantidades.

## 🔧 Configurações Avançadas

### SSR (Server-Side Rendering)
- `canSSRAuth`: Proteção para páginas que requerem autenticação
- `canSSRGuest`: Proteção para páginas de visitantes (login/cadastro)

### Interceptadores de Requisição
- Inclusão automática de tokens de autenticação
- Tratamento de erros 401 (não autorizado)
- Redirecionamento automático em caso de token expirado

## 📱 Responsividade

O sistema é totalmente responsivo, adaptando-se a diferentes tamanhos de tela:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (até 767px)

## 🚨 Tratamento de Erros

- **AuthTokenError**: Erro customizado para problemas de autenticação
- **Toast Notifications**: Feedback visual para sucesso e erro
- **Interceptadores HTTP**: Tratamento global de erros de API

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no repositório!