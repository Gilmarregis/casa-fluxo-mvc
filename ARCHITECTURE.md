# Arquitetura do Sistema de Gestão Financeira Doméstica

## 📋 Visão Geral

Sistema de gestão financeira doméstica construído seguindo o padrão **Model-View-Controller (MVC)** com foco em escalabilidade, segurança e preparação para multi-tenancy.

## 🏗️ Arquitetura MVC

### **Frontend (React + Vite + Tailwind + TypeScript)**

#### **Views** (`/src/pages/`)
- `Landing.tsx` - Landing page com pricing e autenticação
- `Dashboard.tsx` - Visão geral financeira do usuário
- `Transactions.tsx` - Listagem e gestão de transações
- `AddTransaction.tsx` - Formulário para nova transação
- `Budgets.tsx` - Gestão de orçamentos
- `Reports.tsx` - Relatórios e análises financeiras
- `NotFound.tsx` - Página 404 personalizada

#### **Components** (`/src/components/`)
**🎨 UI Components** (`/ui/`) - Biblioteca baseada em shadcn/ui
**🏠 Layout** (`/layout/`) - `Navbar.tsx` com autenticação
**💰 Financial** (`/financial/`) - `BalanceCard.tsx`, `TransactionForm.tsx`, `TransactionList.tsx`
**🚀 Landing** (`/landing/`) - `Hero.tsx` com persuasão, `Pricing.tsx` com marketing
**🔐 Auth** (`/auth/`) - `LoginForm.tsx`, `RegisterForm.tsx`

#### **Controllers** (`/src/controllers/`)
- `AuthController.ts` - Gestão de autenticação JWT
- `TransactionController.ts` - CRUD de transações
- `BudgetController.ts` - Gestão de orçamentos

#### **Models** (`/src/models/`)
- `User.ts` - Modelo de usuário e autenticação
- `Transaction.ts` - Modelo de transações financeiras
- `Category.ts` - Modelo de categorias
- `Budget.ts` - Modelo de orçamentos

## 🔐 Segurança e Multi-Usuário

### **Autenticação**
- JWT tokens para sessões
- localStorage para persistência (preparado para migração)
- Middleware de autenticação em todas as rotas protegidas

### **Isolamento de Dados**
- Campo `usuario_id` em todas as entidades
- Filtragem automática por usuário
- **Preparado para RLS (Row-Level Security)** no Supabase

## 📊 Persistência de Dados

### **Atual: localStorage**
```typescript
- 'financial_auth' - Dados de autenticação
- 'financial_users' - Base de usuários
- 'financial_transactions' - Transações
- 'financial_budgets' - Orçamentos
```

### **Futuro: Supabase PostgreSQL**
Estrutura preparada para migração com tabelas isoladas por usuário.

## 🚀 Escalabilidade

### **Preparação para AWS**
- Gateway Pattern para abstração da camada de dados
- Componentes desacoplados para mudança de backend
- Arquitetura preparada para Lambda + RDS

## 🛠️ Stack Tecnológica
- React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, Zod

---

**Status**: ✅ Implementado e funcional  
**Próximo passo**: Integração com Supabase via Lovable  
**Objetivo**: SaaS completo e escalável para gestão financeira doméstica