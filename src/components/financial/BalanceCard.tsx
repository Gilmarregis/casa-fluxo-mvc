// VIEW: Balance display component
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BalanceCardProps {
  title: string;
  amount: number;
  type: 'income' | 'expense' | 'balance';
  period?: string;
  className?: string;
}

const BalanceCard = ({ title, amount, type, period, className }: BalanceCardProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getIcon = () => {
    switch (type) {
      case 'income':
        return <TrendingUp className="h-4 w-4" />;
      case 'expense':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <DollarSign className="h-4 w-4" />;
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'income':
        return 'text-success';
      case 'expense':
        return 'text-expense';
      case 'balance':
        return amount >= 0 ? 'text-success' : 'text-expense';
      default:
        return 'text-foreground';
    }
  };

  const getCardStyle = () => {
    switch (type) {
      case 'income':
        return 'border-success/20 bg-gradient-to-br from-success/5 to-transparent';
      case 'expense':
        return 'border-expense/20 bg-gradient-to-br from-expense/5 to-transparent';
      case 'balance':
        return amount >= 0 
          ? 'border-success/20 bg-gradient-to-br from-success/5 to-transparent'
          : 'border-expense/20 bg-gradient-to-br from-expense/5 to-transparent';
      default:
        return '';
    }
  };

  return (
    <Card className={cn('transition-all duration-200 hover:shadow-md', getCardStyle(), className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={cn('p-1 rounded-full', getTextColor())}>
          {getIcon()}
        </div>
      </CardHeader>
      <CardContent>
        <div className={cn('text-2xl font-bold', getTextColor())}>
          {formatCurrency(amount)}
        </div>
        {period && (
          <p className="text-xs text-muted-foreground mt-1">
            {period}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default BalanceCard;