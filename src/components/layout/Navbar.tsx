// VIEW: Navigation component
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  TrendingUp, 
  PlusCircle, 
  Target, 
  BarChart3,
  Wallet
} from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/transactions', icon: TrendingUp, label: 'Transações' },
    { path: '/add', icon: PlusCircle, label: 'Adicionar' },
    { path: '/budgets', icon: Target, label: 'Orçamentos' },
    { path: '/reports', icon: BarChart3, label: 'Relatórios' }
  ];

  return (
    <nav className="bg-card border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <Wallet className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-foreground">FinanceHome</span>
            </Link>
          </div>
          
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  )}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
export default Navbar;