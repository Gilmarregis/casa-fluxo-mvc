// VIEW: Budgets page - Budget management
import Navbar from '@/components/layout/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Target, AlertTriangle, CheckCircle } from 'lucide-react';

const Budgets = () => {
  // Mock data for demonstration
  const budgets = [
    {
      id: '1',
      name: 'Orçamento Mensal',
      totalLimit: 5000,
      spent: 3200,
      percentage: 64,
      status: 'on-track',
      categories: [
        { name: 'Alimentação', limit: 800, spent: 650, percentage: 81 },
        { name: 'Transporte', limit: 400, spent: 320, percentage: 80 },
        { name: 'Moradia', limit: 2000, spent: 1800, percentage: 90 }
      ]
    },
    {
      id: '2',
      name: 'Orçamento Semanal',
      totalLimit: 1200,
      spent: 1350,
      percentage: 112,
      status: 'exceeded',
      categories: [
        { name: 'Alimentação', limit: 200, spent: 280, percentage: 140 },
        { name: 'Entretenimento', limit: 300, spent: 450, percentage: 150 }
      ]
    }
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'exceeded':
        return <AlertTriangle className="w-4 h-4 text-expense" />;
      default:
        return <Target className="w-4 h-4 text-warning" />;
    }
  };

  const getStatusColor = (percentage: number) => {
    if (percentage <= 70) return 'text-success';
    if (percentage <= 90) return 'text-warning';
    return 'text-expense';
  };

  const getProgressColor = (percentage: number) => {
    if (percentage <= 70) return 'bg-success';
    if (percentage <= 90) return 'bg-warning';
    return 'bg-expense';
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Orçamentos</h1>
            <p className="text-muted-foreground mt-1">
              Gerencie seus orçamentos e metas de gastos
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <PlusCircle className="w-4 h-4 mr-2" />
            Novo Orçamento
          </Button>
        </div>

        {/* Budget Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {budgets.map((budget) => (
            <Card key={budget.id} className="overflow-hidden">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    {getStatusIcon(budget.status)}
                    <span className="ml-2">{budget.name}</span>
                  </CardTitle>
                  <Badge variant={budget.status === 'exceeded' ? 'destructive' : 'secondary'}>
                    {budget.status === 'exceeded' ? 'Excedido' : 'No Limite'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overall Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progresso Geral</span>
                    <span className={`text-sm font-bold ${getStatusColor(budget.percentage)}`}>
                      {budget.percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={Math.min(budget.percentage, 100)} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Gasto: {formatCurrency(budget.spent)}</span>
                    <span>Limite: {formatCurrency(budget.totalLimit)}</span>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-sm font-medium">Categorias</h4>
                  {budget.categories.map((category, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs">{category.name}</span>
                        <span className={`text-xs font-medium ${getStatusColor(category.percentage)}`}>
                          {category.percentage}%
                        </span>
                      </div>
                      <Progress 
                        value={Math.min(category.percentage, 100)} 
                        className="h-1"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>{formatCurrency(category.spent)}</span>
                        <span>{formatCurrency(category.limit)}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex space-x-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Detalhes
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {/* Add New Budget Card */}
          <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="flex flex-col items-center justify-center h-64 space-y-4">
              <div className="p-4 rounded-full bg-muted">
                <PlusCircle className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-foreground">Criar Novo Orçamento</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Defina metas de gastos para suas categorias
                </p>
              </div>
              <Button variant="outline">
                Começar
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Budget Tips */}
        <Card className="mt-8 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="flex items-center text-primary">
              <Target className="w-4 h-4 mr-2" />
              Dicas para Orçamentos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Estabeleça metas realistas baseadas em seus gastos históricos</li>
              <li>• Revise seus orçamentos mensalmente e ajuste conforme necessário</li>
              <li>• Use a regra 50/30/20: 50% necessidades, 30% desejos, 20% poupança</li>
              <li>• Configure alertas quando atingir 80% do limite de qualquer categoria</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Budgets;