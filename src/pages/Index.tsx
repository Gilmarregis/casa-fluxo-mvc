// VIEW: Dashboard page - Main financial overview
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import BalanceCard from '@/components/financial/BalanceCard';
import TransactionList from '@/components/financial/TransactionList';
import { TransactionController } from '@/controllers/TransactionController';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [balanceData, setBalanceData] = useState({
    totalBalance: 0,
    monthlyIncome: 0,
    monthlyExpenses: 0,
    monthlyBalance: 0
  });

  const loadBalanceData = () => {
    const totalBalance = TransactionController.getCurrentBalance();
    const monthlyIncome = TransactionController.getTotalByType('income');
    const monthlyExpenses = TransactionController.getTotalByType('expense');
    const monthlyBalance = monthlyIncome - monthlyExpenses;

    setBalanceData({
      totalBalance,
      monthlyIncome,
      monthlyExpenses,
      monthlyBalance
    });
  };

  useEffect(() => {
    loadBalanceData();
  }, [refreshTrigger]);

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard Financeiro</h1>
            <p className="text-muted-foreground mt-1">
              Visão geral das suas finanças pessoais
            </p>
          </div>
          <Link to="/add">
            <Button className="bg-primary hover:bg-primary/90">
              <PlusCircle className="w-4 h-4 mr-2" />
              Nova Transação
            </Button>
          </Link>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <BalanceCard
            title="Saldo Total"
            amount={balanceData.totalBalance}
            type="balance"
          />
          <BalanceCard
            title="Receitas do Mês"
            amount={balanceData.monthlyIncome}
            type="income"
            period="Este mês"
          />
          <BalanceCard
            title="Despesas do Mês"
            amount={balanceData.monthlyExpenses}
            type="expense"
            period="Este mês"
          />
          <BalanceCard
            title="Resultado Mensal"
            amount={balanceData.monthlyBalance}
            type="balance"
            period="Este mês"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Transactions */}
          <div className="lg:col-span-2">
            <TransactionList 
              refreshTrigger={refreshTrigger}
              limit={5}
            />
          </div>

          {/* Quick Actions & Summary */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/add" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Adicionar Transação
                  </Button>
                </Link>
                <Link to="/budgets" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Gerenciar Orçamentos
                  </Button>
                </Link>
                <Link to="/reports" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Ver Relatórios
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Financial Tips */}
            <Card className="border-warning/20 bg-gradient-to-br from-warning/5 to-transparent">
              <CardHeader>
                <CardTitle className="flex items-center text-warning">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Dica Financeira
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Mantenha um fundo de emergência equivalente a 3-6 meses de despesas. 
                  Isso ajudará você a lidar com imprevistos sem comprometer seu orçamento.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
