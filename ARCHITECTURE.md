# Arquitetura do Sistema de Gestão Financeira Doméstica

## Visão Geral

Este projeto implementa um sistema completo de gestão financeira doméstica utilizando o padrão arquitetural **Model-View-Controller (MVC)** em React com TypeScript. O sistema permite aos usuários gerenciar receitas, despesas, orçamentos e gerar relatórios financeiros.

## Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript
- **Estilização**: Tailwind CSS + shadcn/ui
- **Roteamento**: React Router DOM
- **Gerenciamento de Estado**: React Hooks + localStorage
- **Build Tool**: Vite
- **Validação**: Zod
- **UI Components**: Radix UI + Lucide Icons

## Estrutura do Projeto

```
src/
├── components/          # VIEW: Componentes de interface
│   ├── ui/             # Componentes base do shadcn/ui
│   ├── layout/         # Componentes de layout (Navbar)
│   └── financial/      # Componentes específicos do domínio financeiro
├── controllers/        # CONTROLLER: Lógica de negócio
├── models/            # MODEL: Entidades e validações
├── pages/             # VIEW: Páginas da aplicação
├── hooks/             # Hooks personalizados
├── lib/               # Utilitários e configurações
└── App.tsx            # Configuração principal e roteamento
```

## Arquitetura MVC

### 1. MODEL (Modelos)

Os modelos definem a estrutura de dados, validações e regras de negócio das entidades.

#### `src/models/Transaction.ts`
- **Responsabilidade**: Define a estrutura e validações para transações financeiras
- **Entidades**: 
  - `Transaction`: Estrutura completa de uma transação
  - `TransactionCreateInput`: Input para criação
  - `TransactionUpdateInput`: Input para atualização
- **Validações**:
  - Validação de valores monetários
  - Validação de descrições
  - Validação de categorias
  - Geração de IDs únicos

#### `src/models/Category.ts`
- **Responsabilidade**: Gerencia categorias de receitas e despesas
- **Funcionalidades**:
  - Categorias pré-definidas com ícones e cores
  - Separação entre categorias de receita e despesa
  - Busca por ID e nome

#### `src/models/Budget.ts`
- **Responsabilidade**: Define estrutura e validações para orçamentos
- **Funcionalidades**:
  - Validação de limites e períodos
  - Suporte a orçamentos por categoria
  - Validação de intervalos de datas

### 2. CONTROLLER (Controladores)

Os controladores implementam a lógica de negócio e fazem a interface entre os modelos e as views.

#### `src/controllers/TransactionController.ts`
- **Responsabilidade**: Gerencia todas as operações com transações
- **Operações CRUD**:
  - `create()`: Criar nova transação
  - `getAll()`: Listar todas as transações
  - `getById()`: Buscar por ID
  - `update()`: Atualizar transação
  - `delete()`: Remover transação
- **Operações de Consulta**:
  - `getByType()`: Filtrar por tipo (receita/despesa)
  - `getByCategory()`: Filtrar por categoria
  - `getByDateRange()`: Filtrar por período
  - `getCurrentMonth()`: Transações do mês atual
- **Cálculos Financeiros**:
  - `getTotalByType()`: Total por tipo
  - `getCurrentBalance()`: Saldo atual
  - `getMonthlyBalance()`: Saldo mensal
  - `getExpensesByCategory()`: Breakdown de despesas

#### `src/controllers/BudgetController.ts`
- **Responsabilidade**: Gerencia orçamentos e acompanhamento de gastos
- **Operações CRUD**: Similar ao TransactionController
- **Análise de Orçamento**:
  - `getBudgetUsage()`: Calcula uso do orçamento
  - `isBudgetExceeded()`: Verifica se orçamento foi excedido
  - `getBudgetAlerts()`: Alertas de orçamento
  - `deactivateExpiredBudgets()`: Desativa orçamentos expirados

### 3. VIEW (Visões)

As views são responsáveis pela apresentação e interação com o usuário.

#### Componentes de Layout
- **`src/components/layout/Navbar.tsx`**: Navegação principal da aplicação

#### Componentes Financeiros
- **`src/components/financial/BalanceCard.tsx`**: Exibe cartões de saldo
- **`src/components/financial/TransactionForm.tsx`**: Formulário para criar transações
- **`src/components/financial/TransactionList.tsx`**: Lista de transações

#### Páginas
- **`src/pages/Index.tsx`**: Dashboard principal com visão geral
- **`src/pages/Transactions.tsx`**: Gestão completa de transações
- **`src/pages/AddTransaction.tsx`**: Página para adicionar transações
- **`src/pages/Budgets.tsx`**: Gestão de orçamentos
- **`src/pages/Reports.tsx`**: Relatórios e análises financeiras

## Fluxo de Dados

### 1. Fluxo de Criação de Transação
```
User Input (View) → TransactionForm → TransactionController.create() → TransactionModel.create() → localStorage → UI Update
```

### 2. Fluxo de Consulta de Dados
```
Page Load (View) → Controller.getAll() → localStorage → State Update → Component Re-render
```

### 3. Fluxo de Validação
```
User Input → Model Validation → Error/Success → Controller Action → View Feedback
```

## Persistência de Dados

O sistema utiliza **localStorage** como camada de persistência, implementada nos controladores:

- **Chave de Armazenamento**: 
  - Transações: `financial_transactions`
  - Orçamentos: `financial_budgets`
- **Serialização**: JSON com conversão de datas
- **Tratamento de Erros**: Try/catch com fallbacks

## Design System

### Cores Semânticas
- **Primary**: Verde financeiro (`--primary: 142 76% 36%`)
- **Success**: Verde para receitas (`--success: 142 76% 36%`)
- **Expense**: Vermelho para despesas (`--expense: 0 84% 60%`)
- **Warning**: Amarelo para alertas (`--warning: 38 92% 50%`)

### Componentes Customizados
- Cartões de saldo com indicadores visuais
- Formulários com validação em tempo real
- Listas responsivas com ações rápidas
- Gráficos de progresso para orçamentos

## Responsividade

- **Mobile First**: Design otimizado para dispositivos móveis
- **Breakpoints**: Tailwind CSS breakpoints padrão
- **Navegação**: Menu adaptativo para diferentes tamanhos de tela

## Validação e Tratamento de Erros

### Validação de Dados
- **Modelo**: Validações de negócio (valores, formatos, etc.)
- **Formulários**: Validação em tempo real com feedback visual
- **Persistência**: Tratamento de erros de localStorage

### Feedback ao Usuário
- **Toast Notifications**: Confirmações e erros
- **Loading States**: Indicadores de carregamento
- **Validação Visual**: Campos com erro destacados

## Escalabilidade

### Adições Futuras Planejadas
1. **Backend Integration**: Substituir localStorage por API
2. **Autenticação**: Sistema de usuários
3. **Relatórios Avançados**: Gráficos interativos
4. **Importação/Exportação**: CSV, PDF
5. **Notificações**: Push notifications para alertas
6. **Metas Financeiras**: Sistema de objetivos
7. **Sincronização**: Multi-dispositivo

### Padrões de Extensão
- **Novos Modelos**: Seguir padrão de validação existente
- **Novos Controllers**: Implementar CRUD básico + operações específicas
- **Novas Views**: Utilizar componentes do design system
- **Novas Páginas**: Seguir estrutura de layout existente

## Performance

### Otimizações Implementadas
- **Lazy Loading**: Componentes carregados sob demanda
- **Memoização**: React.memo em componentes pesados
- **Debounce**: Busca e filtros com delay
- **Virtual Scrolling**: Para listas grandes (planejado)

### Monitoramento
- **Console Logs**: Para debugging em desenvolvimento
- **Error Boundaries**: Captura de erros em produção (planejado)
- **Analytics**: Métricas de uso (planejado)

## Segurança

### Práticas Implementadas
- **Validação de Input**: Sanitização de dados
- **TypeScript**: Tipagem forte para prevenção de erros
- **Escape de HTML**: Prevenção de XSS
- **Validação Client-Side**: Dupla validação (cliente + modelo)

### Considerações para Produção
- **HTTPS Only**: Comunicação segura
- **Token Authentication**: Para APIs futuras
- **Data Encryption**: Para dados sensíveis
- **Audit Logs**: Rastreamento de operações

## Testes (Planejado)

### Estratégia de Testes
- **Unit Tests**: Modelos e controladores
- **Integration Tests**: Fluxos completos
- **E2E Tests**: Cenários de usuário
- **Visual Regression**: Consistência de UI

### Ferramentas Sugeridas
- **Jest**: Testes unitários
- **React Testing Library**: Testes de componentes
- **Cypress**: Testes E2E
- **Storybook**: Documentação de componentes

---

## Conclusão

Esta arquitetura MVC fornece uma base sólida e escalável para um sistema de gestão financeira doméstica. A separação clara de responsabilidades facilita a manutenção, testes e extensão do sistema, enquanto o design system consistente garante uma experiência de usuário coesa em todos os dispositivos.