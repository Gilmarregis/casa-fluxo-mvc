// VIEW: Transaction list component
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TransactionController } from '@/controllers/TransactionController';
import { CategoryModel } from '@/models/Category';
import { Transaction } from '@/models/Transaction';
import { Trash2, Edit, TrendingUp, TrendingDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

interface TransactionListProps {
  refreshTrigger?: number;
  limit?: number;
  showActions?: boolean;
}

const TransactionList = ({ refreshTrigger = 0, limit, showActions = true }: TransactionListProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { toast } = useToast();

  const loadTransactions = () => {
    let allTransactions = TransactionController.getAll();
    
    // Sort by creation date (newest first)
    allTransactions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    
    if (limit) {
      allTransactions = allTransactions.slice(0, limit);
    }
    
    setTransactions(allTransactions);
  };

  useEffect(() => {
    loadTransactions();
  }, [refreshTrigger, limit]);

  const handleDelete = (id: string) => {
    try {
      TransactionController.delete(id);
      loadTransactions();
      toast({
        title: "Transação excluída",
        description: "A transação foi removida com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao excluir",
        description: "Não foi possível excluir a transação.",
        variant: "destructive"
      });
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);
  };

  const getCategoryName = (categoryId: string) => {
    const category = CategoryModel.getCategoryById(categoryId);
    return category?.name || 'Categoria não encontrada';
  };

  if (transactions.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Nenhuma transação encontrada.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Transações Recentes
          {limit && (
            <span className="text-sm font-normal text-muted-foreground">
              {transactions.length} de {transactions.length}
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 border rounded-lg bg-card hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className={cn(
                  "p-2 rounded-full",
                  transaction.type === 'income' 
                    ? "bg-success/10 text-success" 
                    : "bg-expense/10 text-expense"
                )}>
                  {transaction.type === 'income' ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {getCategoryName(transaction.category)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(transaction.date)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <span className={cn(
                  "font-semibold",
                  transaction.type === 'income' ? "text-success" : "text-expense"
                )}>
                  {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                </span>
                
                {showActions && (
                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                      className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionList;