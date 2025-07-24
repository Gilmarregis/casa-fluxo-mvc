import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthController } from "@/controllers/AuthController";
import Navbar from "@/components/layout/Navbar";
import BalanceCard from "@/components/financial/BalanceCard";
import { TransactionController } from "@/controllers/TransactionController";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = AuthController.getCurrentUser();

  useEffect(() => {
    if (!AuthController.isAuthenticated()) {
      navigate('/');
    }
  }, [navigate]);

  if (!user) {
    return null;
  }

  const transactions = TransactionController.getAll();
  const income = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Bem-vindo, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            Plano atual: <span className="capitalize font-medium">{user.plan}</span>
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <BalanceCard
            title="Saldo Total"
            amount={balance}
            type={balance >= 0 ? 'income' : 'expense'}
          />
          <BalanceCard
            title="Receitas"
            amount={income}
            type="income"
          />
          <BalanceCard
            title="Despesas"
            amount={expenses}
            type="expense"
          />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Resumo do Mês</h2>
            <p className="text-muted-foreground">
              Você tem {transactions.length} transações registradas.
            </p>
          </div>
          
          <div className="bg-card rounded-lg border p-6">
            <h2 className="text-xl font-semibold mb-4">Ações Rápidas</h2>
            <div className="space-y-2">
              <a href="/add" className="block text-primary hover:underline">
                → Adicionar Transação
              </a>
              <a href="/transactions" className="block text-primary hover:underline">
                → Ver Todas as Transações
              </a>
              <a href="/budgets" className="block text-primary hover:underline">
                → Gerenciar Orçamentos
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}