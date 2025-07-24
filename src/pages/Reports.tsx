// VIEW: Reports page - Financial analytics and charts
import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TransactionController } from '@/controllers/TransactionController';
import { CategoryModel } from '@/models/Category';
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [reportData, setReportData] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    balance: 0,
    expensesByCategory: {} as { [key: string]: number },
    incomesByCategory: {} as { [key: string]: number }
  });

  const loadReportData = () => {
    const now = new Date();
    let startDate: Date;
    let endDate: Date = now;

    switch (selectedPeriod) {
      case 'current-month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'last-month':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'current-year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'last-year':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }

    const transactions = TransactionController.getByDateRange(startDate, endDate);
    const income = transactions.filter(t => t.type === 'income');
    const expenses = transactions.filter(t => t.type === 'expense');

    const totalIncome = income.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = expenses.reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;

    // Group by category
    const expensesByCategory: { [key: string]: number } = {};
    const incomesByCategory: { [key: string]: number } = {};

    expenses.forEach(expense => {
      const category = CategoryModel.getCategoryById(expense.category);
      const categoryName = category?.name || 'Outros';
      expensesByCategory[categoryName] = (expensesByCategory[categoryName] || 0) + expense.amount;
    });

    income.forEach(inc => {
      const category = CategoryModel.getCategoryById(inc.category);
      const categoryName = category?.name || 'Outros';
      incomesByCategory[categoryName] = (incomesByCategory[categoryName] || 0) + inc.amount;
    });

    setReportData({
      totalIncome,
      totalExpenses,
      balance,
      expensesByCategory,
      incomesByCategory
    });
  };

  useEffect(() => {
    loadReportData();
  }, [selectedPeriod]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getPeriodLabel = () => {
    switch (selectedPeriod) {
      case 'current-month': return 'Este Mês';
      case 'last-month': return 'Mês Passado';
      case 'current-year': return 'Este Ano';
      case 'last-year': return 'Ano Passado';
      default: return 'Este Mês';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
            <p className="text-muted-foreground mt-1">
              Análise detalhada das suas finanças
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-muted-foreground" />
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Este Mês</SelectItem>
                <SelectItem value="last-month">Mês Passado</SelectItem>
                <SelectItem value="current-year">Este Ano</SelectItem>
                <SelectItem value="last-year">Ano Passado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-success/20 bg-gradient-to-br from-success/5 to-transparent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Receitas</CardTitle>
              <TrendingUp className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">
                {formatCurrency(reportData.totalIncome)}
              </div>
              <p className="text-xs text-muted-foreground">
                {getPeriodLabel()}
              </p>
            </CardContent>
          </Card>

          <Card className="border-expense/20 bg-gradient-to-br from-expense/5 to-transparent">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total de Despesas</CardTitle>
              <BarChart3 className="h-4 w-4 text-expense" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-expense">
                {formatCurrency(reportData.totalExpenses)}
              </div>
              <p className="text-xs text-muted-foreground">
                {getPeriodLabel()}
              </p>
            </CardContent>
          </Card>

          <Card className={`border-${reportData.balance >= 0 ? 'success' : 'expense'}/20 bg-gradient-to-br from-${reportData.balance >= 0 ? 'success' : 'expense'}/5 to-transparent`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saldo do Período</CardTitle>
              <PieChart className={`h-4 w-4 ${reportData.balance >= 0 ? 'text-success' : 'text-expense'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${reportData.balance >= 0 ? 'text-success' : 'text-expense'}`}>
                {formatCurrency(reportData.balance)}
              </div>
              <p className="text-xs text-muted-foreground">
                {getPeriodLabel()}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Expenses by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Despesas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(reportData.expensesByCategory)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, amount]) => {
                    const percentage = reportData.totalExpenses > 0 
                      ? (amount / reportData.totalExpenses) * 100 
                      : 0;
                    
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{formatCurrency(amount)}</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-expense h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                
                {Object.keys(reportData.expensesByCategory).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma despesa encontrada no período selecionado
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Incomes by Category */}
          <Card>
            <CardHeader>
              <CardTitle>Receitas por Categoria</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(reportData.incomesByCategory)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, amount]) => {
                    const percentage = reportData.totalIncome > 0 
                      ? (amount / reportData.totalIncome) * 100 
                      : 0;
                    
                    return (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">{category}</span>
                          <div className="text-right">
                            <div className="text-sm font-bold">{formatCurrency(amount)}</div>
                            <div className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div 
                            className="bg-success h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                
                {Object.keys(reportData.incomesByCategory).length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    Nenhuma receita encontrada no período selecionado
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Financial Health Summary */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Resumo da Saúde Financeira</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {reportData.totalExpenses > 0 ? ((reportData.totalIncome / reportData.totalExpenses) * 100).toFixed(1) : 0}%
                </div>
                <div className="text-sm text-muted-foreground">Receita vs Despesa</div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {Object.keys(reportData.expensesByCategory).length}
                </div>
                <div className="text-sm text-muted-foreground">Categorias de Despesa</div>
              </div>
              
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {reportData.totalExpenses > 0 
                    ? Math.max(...Object.values(reportData.expensesByCategory)).toFixed(0)
                    : 0}
                </div>
                <div className="text-sm text-muted-foreground">Maior Gasto (R$)</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;